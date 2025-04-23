let test = 0;

function ropeKey(index) {
    if (index === 0) {
        test++;
        document.getElementById('testValue').textContent = test;
    }
}