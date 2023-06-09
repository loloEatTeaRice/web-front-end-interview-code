const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

let ID = 0

// 将ES6代码通过parser转换成AST
// 通过traverse提取AST中的依赖文件名
// 通过babel将AST转换成ES5代码
function createAsset (filename) {
    const content = fs.readFileSync(filename, 'utf-8')

    const ast = parser.parse(content, {
        sourceType: 'module'
    })

    const dependencies = []

    traverse(ast, {
        ImportDeclaration: ({ node }) => {
            dependencies.push(node.source.value)
        }
    })

    const { code } = babel.transformFromAstSync(ast, null, {
        presets: ['@babel/preset-env']
    })

    let id = ID++;

    return {
        id,
        filename,
        code,
        dependencies
    }
}

// 构建文件依赖图
function createGraph (entry) {
    const mainAsset = createAsset(entry)

    const queue = [mainAsset]

    for (const asset of queue) {
        const dirname = path.dirname(asset.filename)

        asset.mapping = {}

        asset.dependencies.forEach(relativePath => {
            const absolutePath = path.join(dirname, relativePath)

            const child = createAsset(absolutePath)

            asset.mapping[relativePath] = child.id

            queue.push(child)
        })
    }

    return queue
}

// 打包
function bundle (graph) {
    let modules = ''
    graph.forEach(mod => {
        modules += `
            ${mod.id}: [
                function(require, module, exports) {
                    ${mod.code}
                },
                ${JSON.stringify(mod.mapping)}
            ],
        `
    })

    const result = `
        (function(modules) {
            function require(id) {
                const [fn, mapping] = modules[id]

                function localRequire(relativePath) {
                    return require(mapping[relativePath])
                }

                const module = {
                    exports: {}
                }

                fn(localRequire, module, module.exports)

                return module.exports
            }

            require(0)
        })({${modules}})
    `

    return result
}

const graph = createGraph('./src/index.js')
const result = bundle(graph)
console.log(result);