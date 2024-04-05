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

function doCapture() {
    var prtContent = document.getElementById("SolutionFormOutput");
    var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write('<link rel="stylesheet" href="index.css">')
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
}

// ---------------FUNCTION---------------- //

function findSuitableElement(IdElement) {
    const children = solutionFormDiv.children;
    var index = 0;
    for (let i = 0; i < children.length; i++) {
        if (children[i].id === IdElement) {
            index = i;
            break;
        }
    }
    for (let i = index; i >= 0; i--) {
        if (children[i].classList.contains('FormLaTex') || children[i].classList.contains('FormInput')) {
            return children[i].children[1].id;
        }
    }
    return;
}

function findNextElement(IdElement) {
    const children = solutionFormDiv.children;
    var index = 0;
    for (let i = 0; i < children.length; i++) {
        if (children[i].id === IdElement) {
            index = i;
            break;
        }
    }
    for (let i = index; i < children.length; i++) {
        if (children[i].classList.contains('CreateNewFormLaTexOrFormInput')) {
            return children[i];
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
    const NameToolBar = generateId();
    const NameImageOut = NameTextArea + "Output";

    var containerLatex = document.createElement("div");
    containerLatex.classList.add("FormLaTex");
    containerLatex.setAttribute("id", generateId());

    var toolBarDiv = document.createElement("div");
    toolBarDiv.classList.add("ToolBarMathFomula");
    toolBarDiv.setAttribute("id", NameToolBar);

    var textAreaDiv = document.createElement("div");
    textAreaDiv.classList.add("FormLaTexInput");
    textAreaDiv.setAttribute("id", NameTextArea);
    textAreaDiv.addEventListener("click", function () {
        toolBarDiv.style.zIndex = ++focusOn;
    });

    const DeleteIcon = document.createElement('div');
    DeleteIcon.classList.add('DeleteIcon');
    DeleteIcon.innerHTML = '<i class="fa-solid fa-trash"></i>';
    DeleteIcon.ondblclick = function () {
        findNextElement(containerLatex.id).classList.add('scaleElement');
        containerLatex.classList.add('scaleElement');
        getById(NameImageOut).classList.add('scaleElement');
    };

    const SymbolIcon = document.createElement('div');
    SymbolIcon.classList.add('SymbolIcon');
    SymbolIcon.innerHTML = '<i class="fas fa-square-root-alt"></i>';

    containerLatex.appendChild(SymbolIcon);
    containerLatex.appendChild(textAreaDiv);
    containerLatex.appendChild(DeleteIcon);


    var imageOutImg = document.createElement("img");
    imageOutImg.classList.add("ImageOutput");
    imageOutImg.setAttribute("id", NameImageOut);

    InsertElementAfter(IndexElement, toolBarDiv, solutionFormDiv);
    InsertElementAfter(IndexElement, containerLatex, solutionFormDiv);

    if (IdInOutput) {
        const IndexInOutput = findIndexById(IdInOutput, solutionFormOutput);
        InsertElementAfter(IndexInOutput, imageOutImg, solutionFormOutput);
    }
    else {
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
    newFormLaTex.innerHTML = '<span><i class="fa-solid fa-circle-plus"></i> New LaTex</span>';
    newFormLaTex.onclick = function () {
        CreateElementLatex(createNewFormLaTexOrFormInput.id);
    };

    const newFormInput = document.createElement('button');
    newFormInput.classList.add('NewFormInput');
    newFormInput.innerHTML = '<span><i class="fa-solid fa-circle-plus"></i> New Sentence</span>';
    newFormInput.onclick = function () {
        CreateElementInput(createNewFormLaTexOrFormInput.id);
    };

    createNewFormLaTexOrFormInput.appendChild(newFormLaTex);
    createNewFormLaTexOrFormInput.appendChild(newFormInput);

    InsertElementAfter(IndexElement + 1, createNewFormLaTexOrFormInput, solutionFormDiv);
}

function CreateElementInput(IdElement) {
    const IdNextElement = findSuitableElement(IdElement);

    const IdInOutput = IdNextElement ? IdNextElement + "Output" : "";
    const idInputTag = generateId();

    const containerInput = document.createElement('div');
    containerInput.classList.add('FormInput');
    containerInput.setAttribute('id', generateId());


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

    const DeleteIcon = document.createElement('div');
    DeleteIcon.classList.add('DeleteIcon');
    DeleteIcon.innerHTML = '<i class="fa-solid fa-trash"></i>';
    DeleteIcon.ondblclick = function () {
        findNextElement(containerInput.id).classList.add('scaleElement');
        containerInput.classList.add('scaleElement');
        getById(contentElement.id).classList.add('scaleElement');
    };

    const SymbolIcon = document.createElement('div');
    SymbolIcon.classList.add('SymbolIcon');
    SymbolIcon.innerHTML = '<i class="fas fa-pen-nib"></i>';

    containerInput.appendChild(SymbolIcon);
    containerInput.appendChild(inputElement);
    containerInput.appendChild(DeleteIcon);

    const IndexElement = findIndexById(IdElement, solutionFormDiv);
    InsertElementAfter(IndexElement, containerInput, solutionFormDiv);

    if (IdInOutput) {
        const IndexInOutput = findIndexById(IdInOutput, solutionFormOutput);
        InsertElementAfter(IndexInOutput, contentElement, solutionFormOutput);
    }
    else {
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
getById('latexInput').addEventListener("click", function () {
    getById('toolbar').style.zIndex = ++focusOn;
});

getByClass('DeleteIcon')[0].addEventListener('dblclick', function () {
    getById("FristFormLaTex").classList.add('scaleElement');
    getById("latexInputOutput").classList.add('scaleElement');
    getById("NTTrung9204").classList.add('scaleElement');
});


