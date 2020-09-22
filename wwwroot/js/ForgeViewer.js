var viewer;

function launchViewer(urn) {
    var options = {
        env: 'AutodeskProduction',
        getAccessToken: getForgeToken
    };

    Autodesk.Viewing.Initializer(options, () => {
        viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['ModelSummaryExtensionClass', 'SampleExtension','Autodesk.DocumentBrowser','OverLayGeometry']});
        viewer.start();

        // The documentId is a string value of the URN of the model that was translated.
        // The value assigned to documentId must be prefixed with the string urn:
        var documentId = 'urn:' + urn;
        Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
        console.log("initialization complete, creating the viewer...");
    });
}

function onDocumentLoadSuccess(viewerDocument) {
    // viewerDocument is an instance of Autodesk.Viewing.Document.
    // The code below assumes that a viewer instance is available "viewerDocument".

    // To choose a different model, retrieve the list of all models and have custom code to decide which one to load:
    var viewables = viewerDocument.getRoot().search({ 'type': 'geometry' });
    console.log(viewables)
    var testHandleId = viewerDocument.getRoot().search({ 'displayValue': 'f0da' });
    console.log(testHandleId)
    // To load the default model in the manifest:
    var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
    console.log(defaultModel)

    viewer.loadDocumentNode(viewerDocument, defaultModel ).then(i => {
        // documented loaded, any action?
        console.log("Eric - Document loaded succesfully")

        // Execute test function getAllLeafComponents_v2
        //getAllLeafComponents_v2(NOP_VIEWER, function (dbIds) {
        //    console.log('Found ' + dbIds.length + ' leaf nodes');
        //})

    });
}

function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function getForgeToken(callback) {
    fetch('/api/forge/oauth/token').then(res => {
        res.json().then(data => {
            callback(data.access_token, data.expires_in);
        });
    });
}
