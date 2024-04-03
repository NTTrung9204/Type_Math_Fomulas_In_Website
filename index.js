// ---------------UTILS---------------- //

function getByClass(className) {
    return document.getElementsByClassName(className);
}

function getById(id) {
    return document.getElementById(id);
}

function generateId(length = 10) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }

    return id;
}

function findIndexById(elementId) {
    console.log(elementId);

    const children = solutionFormDiv.children;
    for (let i = 0; i < children.length; i++) {
        console.log(children[i].id);
        if (children[i].id === elementId) {
            return i;
        }
    }
    return -1;
}

function CreateElementLatex(IdElement) {
    console.log(IdElement);

    const IndexElement = findIndexById(IdElement);

    console.log(IndexElement);

    let NameTextArea = generateId();
    let NameToolBar  = generateId();
    let NameImageOut = generateId();

    var toolBarDiv = document.createElement("div");
    toolBarDiv.classList.add("ToolBarMathFomula");
    toolBarDiv.setAttribute("id", NameToolBar);

    var textAreaDiv = document.createElement("div");
    textAreaDiv.classList.add("FormLaTexInput");
    textAreaDiv.setAttribute("id", NameTextArea);

    var containerOutDiv = document.createElement("div");
    containerOutDiv.classList.add("ContainerOut");

    var imageOutImg = document.createElement("img");
    imageOutImg.classList.add("ImageOut");
    imageOutImg.setAttribute("id", NameImageOut);

    containerOutDiv.appendChild(imageOutImg);

    InsertElementAfter(IndexElement, toolBarDiv);
    InsertElementAfter(IndexElement, textAreaDiv);
    InsertElementAfter(IndexElement, containerOutDiv);

    CreateFormMathFomula(NameTextArea, NameToolBar, NameImageOut);

    CreateOptionAddButton(IdElement);
}

function CreateFormMathFomula(NameTextArea, NameToolBar, NameImageOut) {
    FormMathFomula = new EqEditor.TextArea(NameTextArea)
        .addToolbar(new EqEditor.Toolbar(NameToolBar), true)
        .addOutput(new EqEditor.Output(NameImageOut));
}

function CreateOptionAddButton(IdElement) {
    const IndexElement = findIndexById(IdElement);

    const createNewFormLaTexOrFormInput = document.createElement('div');
    createNewFormLaTexOrFormInput.classList.add('CreateNewFormLaTexOrFormInput');

    const newFormLaTex = document.createElement('button');
    newFormLaTex.classList.add('NewFormLaTex');
    newFormLaTex.innerHTML = '<span>+ New LaTex</span>';

    const newFormInput = document.createElement('button');
    newFormInput.classList.add('NewFormInput');
    newFormInput.innerHTML = '<span>+ New Sentence</span>';

    createNewFormLaTexOrFormInput.appendChild(newFormLaTex);
    createNewFormLaTexOrFormInput.appendChild(newFormInput);

    InsertElementAfter(IndexElement + 2, createNewFormLaTexOrFormInput);
}

function InsertElementAfter(IndexElement, newElement) {
    solutionFormDiv.insertBefore(newElement, solutionFormDiv.children[IndexElement + 1]);
}

// ---------------VARIABLE---------------- //

const solutionFormDiv = getById("SolutionFormInput");
var focusOn = 1;
var ToolBar = document.getElementsByClassName('ToolBar');

// ---------------MAIN---------------- //

CreateFormMathFomula("latexInput", "toolbar", "output");


