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

function findSuitableElement(IdElement) {
    const children = solutionFormDiv.children;
    var index = 0;
    for (let i = 0; i < children.length; i++) {
        if (children[i].id === IdElement) {
            index = i;
            break;
        }
    }
    for(let i = index; i >= 0; i--){
        if(children[i].classList.contains('FormLaTexInput') || children[i].classList.contains('FormTextInput')){
            return children[i].id;
        }
    }
    return;
}

function findIndexById(elementId, ParentElement) {
    const children = ParentElement.children;
    for (let i = 0; i < children.length; i++) {
        if (children[i].id === elementId) {
            return i;
        }
    }
    return -1;
}

function CreateElementLatex(IdElement) {
    const IndexElement = findIndexById(IdElement, solutionFormDiv);

    const IdNextElement = findSuitableElement(IdElement);

    const IdInOutput = IdNextElement ? IdNextElement + "Output" : "";

    const NameTextArea = generateId();
    const NameToolBar  = generateId();
    const NameImageOut = NameTextArea + "Output";

    var toolBarDiv = document.createElement("div");
    toolBarDiv.classList.add("ToolBarMathFomula");
    toolBarDiv.setAttribute("id", NameToolBar);

    var textAreaDiv = document.createElement("div");
    textAreaDiv.classList.add("FormLaTexInput");
    textAreaDiv.setAttribute("id", NameTextArea);
    textAreaDiv.addEventListener("click", function () {
        toolBarDiv.style.zIndex = ++focusOn;
    });

    var imageOutImg = document.createElement("img");
    imageOutImg.classList.add("ImageOutput");
    imageOutImg.setAttribute("id", NameImageOut);

    InsertElementAfter(IndexElement, toolBarDiv, solutionFormDiv);
    InsertElementAfter(IndexElement, textAreaDiv, solutionFormDiv);

    if(IdInOutput){
        const IndexInOutput = findIndexById(IdInOutput, solutionFormOutput);
        InsertElementAfter(IndexInOutput, imageOutImg, solutionFormOutput);
    }
    else{
        solutionFormOutput.insertBefore(imageOutImg, solutionFormOutput.children[0]);
    }

    CreateFormMathFomula(NameTextArea, NameToolBar, NameImageOut);

    CreateOptionAddButton(IdElement);
}

function CreateFormMathFomula(NameTextArea, NameToolBar, NameImageOut) {
    FormMathFomula = new EqEditor.TextArea(NameTextArea)
        .addToolbar(new EqEditor.Toolbar(NameToolBar), true)
        .addOutput(new EqEditor.Output(NameImageOut));
}

function CreateOptionAddButton(IdElement) {
    const IndexElement = findIndexById(IdElement, solutionFormDiv);

    const createNewFormLaTexOrFormInput = document.createElement('div');
    createNewFormLaTexOrFormInput.classList.add('CreateNewFormLaTexOrFormInput');
    createNewFormLaTexOrFormInput.id = generateId();

    const newFormLaTex = document.createElement('button');
    newFormLaTex.classList.add('NewFormLaTex');
    newFormLaTex.innerHTML = '<span>+ New LaTex</span>';
    newFormLaTex.onclick = function () {
        CreateElementLatex(createNewFormLaTexOrFormInput.id);
    };

    const newFormInput = document.createElement('button');
    newFormInput.classList.add('NewFormInput');
    newFormInput.innerHTML = '<span>+ New Sentence</span>';
    newFormInput.onclick = function () {
        CreateElementInput(createNewFormLaTexOrFormInput.id);
    };

    createNewFormLaTexOrFormInput.appendChild(newFormLaTex);
    createNewFormLaTexOrFormInput.appendChild(newFormInput);

    InsertElementAfter(IndexElement + 1, createNewFormLaTexOrFormInput, solutionFormDiv);
}

function CreateElementInput(IdElement){
    const IdNextElement = findSuitableElement(IdElement);

    const IdInOutput = IdNextElement ? IdNextElement + "Output" : "";
    const idInputTag = generateId();

    const inputElement = document.createElement('input');
    inputElement.setAttribute('placeholder', 'Viết nội dung...');
    inputElement.classList.add('FormTextInput');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('id', idInputTag);

    const contentElement = document.createElement('div');
    contentElement.id = idInputTag + "Output";

    inputElement.addEventListener("keyup", function () {
        contentElement.innerHTML = inputElement.value;
    });

    const IndexElement = findIndexById(IdElement, solutionFormDiv);
    InsertElementAfter(IndexElement, inputElement, solutionFormDiv);

    if(IdInOutput){
        const IndexInOutput = findIndexById(IdInOutput, solutionFormOutput);
        InsertElementAfter(IndexInOutput, contentElement, solutionFormOutput);
    }
    else{
        solutionFormOutput.insertBefore(contentElement, solutionFormOutput.children[0]);
    }

    CreateOptionAddButton(IdElement);
}

function InsertElementAfter(IndexElement, newElement, ParentElement) {
    ParentElement.insertBefore(newElement, ParentElement.children[IndexElement + 1]);
}

// ---------------VARIABLE---------------- //

const solutionFormDiv = getById("SolutionFormInput");
const solutionFormOutput = getById("SolutionFormOutput");
var focusOn = 1;
var ToolBar = document.getElementsByClassName('ToolBar');

// ---------------MAIN---------------- //

CreateFormMathFomula("latexInput", "toolbar", "latexInputOutput");


