// ---------------UTILS---------------- //

function getByClass(className) {
    return document.getElementsByClassName(className);
}

function getById(id) {
    return document.getElementById(id);
}

function addTextArea() {
    var toolBarDiv = document.createElement("div");
    toolBarDiv.classList.add("ToolBar");
    toolBarDiv.setAttribute("id", "abc");

    var textAreaDiv = document.createElement("div");
    textAreaDiv.classList.add("TextArea");
    textAreaDiv.setAttribute("id", "xyz");

    var containerOutDiv = document.createElement("div");
    containerOutDiv.classList.add("ContainerOut");

    var imageOutImg = document.createElement("img");
    imageOutImg.classList.add("ImageOut");
    imageOutImg.setAttribute("id", "mnp");

    solutionFormDiv.appendChild(toolBarDiv);
    solutionFormDiv.appendChild(textAreaDiv);
    containerOutDiv.appendChild(imageOutImg);
    solutionFormDiv.appendChild(containerOutDiv);

    textarea1 = new EqEditor.TextArea('xyz')
        .addToolbar(new EqEditor.Toolbar('abc'), true)
        .addOutput(new EqEditor.Output('mnp'));
}

function CreateFormMathFomula(NameTextArea, NameToolBar, NameImageOut) {
    FormMathFomula = new EqEditor.TextArea(NameTextArea)
    .addToolbar(new EqEditor.Toolbar(NameToolBar), true)
    .addOutput(new EqEditor.Output(NameImageOut));
}

// ---------------VARIABLE---------------- //

const solutionFormDiv = getByClass("solutionForm")[0];
var focusOn = 1;
var ToolBar = document.getElementsByClassName('ToolBar');

// ---------------MAIN---------------- //

CreateFormMathFomula("latexInput", "toolbar", "output");


