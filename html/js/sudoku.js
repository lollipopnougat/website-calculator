let div = document.getElementById('cell-table');
for(let i = 0; i < 81; i++) {
    let div_tmp = document.createElement('div');
    let input_tmp = document.createElement('input');
    div_tmp.className = 'cell';
    div_tmp.appendChild(input_tmp);
    input_tmp.id = 'input' + i;
    input_class_str = 'cell-input';
    if(i % 3 == 2) {
        input_class_str += ' right-border'; 
    }
    else if (i % 3 == 0) {
        input_class_str += ' left-border'; 
    }
    if((i <= 26 && i >= 18)||(i <= 53 && i >= 45)) {
        input_class_str += ' bottom-border';
    }
    else if((i <= 35 && i >= 27)||(i <= 62 && i >= 54)) {
        input_class_str += ' top-border';
    }
    input_tmp.className = input_class_str;
    div.appendChild(div_tmp);
}