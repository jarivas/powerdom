/*
//Promises
let chartloadPromise = null;

//Vars / Conf
let version = 'current';
let packages = ['corechart', 'annotationchart', 'bar', 'gauge'];

//Init
chartloadPromise = new Promise((resolve, reject) => {
    google.charts.load(version, { 'packages': packages });

    google.charts.setOnLoadCallback(() => {
        resolve('Charts loaded');
    });
});


Promise.all([chartloadPromise])
    .then((values) => {
        console.log('dependeciesLoaded', values);
        PD.fire('dependeciesLoaded');
    });
*/
setTimeout(() => {
    PD.fire('dependeciesLoaded');    
    console.log('dependeciesLoaded');
}, 1000);
