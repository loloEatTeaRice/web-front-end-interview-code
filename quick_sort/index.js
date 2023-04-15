// 快排实现（递归）

function partition (arr, start, end) {
    // 以最后一个元素为基准
    const pivotValue = arr[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            // 交换元素
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            // 移动到下一个元素
            pivotIndex++;
        }
    }

    // 把基准值放在中间
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]
    return pivotIndex;
};

function quickSort (arr, start, end) {
    // 终止条件
    if (start >= end) {
        return;
    }

    // 返回 pivotIndex
    let index = partition(arr, start, end);

    // 将相同的逻辑递归地用于左右子数组
    quickSort(arr, start, index - 1);
    quickSort(arr, index + 1, end);
}

array = [7, -2, 4, 1, 6, 5, 0, -4, 2]
quickSort(array, 0, array.length - 1)

console.log(array)