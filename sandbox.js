Contoh1:
arr = [1,2,3,4,5,6,7,8,9];
n=8;
result = [[ 1, 7 ], [ 2, 6 ],[ 3, 5 ], [ 4, 4 ],[ 5, 3 ], [ 6, 2 ],[ 7, 1 ]];

Contoh2:
arr = [0,1,2,3,4,5,6];
n=6;
result = [[ 0, 6 ], [ 1, 5 ],[ 2, 4 ], [ 3, 3 ],[ 4, 2 ], [ 5, 1 ],[ 6, 0 ]];
// Buatlah sebuah fungsi yang menerima minimal satu parameter angka dimana hasil dari fungsi tersebut adalah pasangan angka yang jika dijumlahkan akan sama dengan angka dari parameter. Pasangan angka tersebut didapatkan dari sebuah deret angka.


function findPairs(target) {
    let result = [];
    let target2 = []
    for (let i = 0; i < target; i++) {

        let test = target - i
        result.push(i,test)
    }
    return result[target2]
}

console.log(findPairs(8));
console.log(findPairs(6));
