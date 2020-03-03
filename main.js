const addButton = document.querySelector('.addButton');
let inputValue = document.querySelector('.input');
const container = document.querySelector('.container');

class item
{
    constructor(itemName)
    {
        this.createDiv(itemName)
    }
    createDiv(itemName)
    {
        let input = document.createElement('textarea');
        input.value = itemName;
        input.disabled =true;
        input.classList.add('item_input');

        let itemBox = document.createElement('div');
        itemBox.classList.add('item');

        let editButton = document.createElement('button');
        editButton.innerHTML ="Sửa";
        editButton.classList.add('editButton');

        let removeButton = document.createElement('button');
        removeButton.innerHTML ="Xóa";
        removeButton.classList.add('removeButton');

        let doneButton = document.createElement('button');
        doneButton.innerHTML ="Hoàn Thành";
        doneButton.classList.add('doneButton');

        container.appendChild(itemBox);
        itemBox.appendChild(input);
        itemBox.appendChild(editButton);
        itemBox.appendChild(removeButton);
        itemBox.appendChild(doneButton);

        editButton.addEventListener('click',() => this.edit(input));
        removeButton.addEventListener('click',() => this.remove(itemBox));
    }
    edit(input)
    {
        input.disabled = !input.disabled;
    }
    remove(item)
    {
        container.removeChild(item);
    }
}
new item("Quang đẹp trai");