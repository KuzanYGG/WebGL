/**
 * YGGWebGL.js
 * WebGL specific functionality for YGG Unity integration
 * Uses common functions from YGGCommon.js
 */

// Note: Make sure to include YGGCommon.js before this file

/**
 * Handle orientation change events
 * @param {string} orientation - The new orientation
 */
function YGGOnOrientationChanged(orientation) {
    YGGSendMessageToUnityCustom(defaultObjectName, "OrientationChanged", orientation);
}

/**
 * Handle game size change events
 */
function YGGOnGameSizeChanged() {
    YGGSendMessageToUnityCustom(defaultObjectName, "SizeChanged");
}

/**
 * Handle wallet address reception
 * @param {string} value - Wallet address
 */
function YGGOnReceiveWalletAddress(value) {
    YGGSendMessageToUnityCustom(webGLBlockchainMessageReceiverObjectName, "SendWalletAddressFromWebGL", value);
}

/**
 * Handle vip bundle purchase reception
 * @param {string} value - Vip bundle purchase data
 */
function YGGOnReceiveVipBundlePurchase(value) {
    YGGSendMessageToUnityCustom(webGLBlockchainMessageReceiverObjectName, "SendVipBundlePurchaseFromWebGL", value);
}

/**
 * Handle contract function reception
 * @param {string} value - Contract function data
 */
function YGGOnReceiveContractFunction(value) {
    YGGSendMessageToUnityCustom(webGLBlockchainMessageReceiverObjectName, "SendContractFunctionFromWebGL", value);
}

/**
 * Handle wallet account change events
 * @param {string} value - New wallet address
 */
function YGGOnReceiveAccountChanged(value) {
    YGGSendMessageToUnityCustom(webGLBlockchainMessageReceiverObjectName, "SendAccountChangedFromWebGL", value);
}

/**
 * Handle bind wallet response
 * @param {string} value - Bind wallet response data
 */
function YGGOnReceiveBindWallet(value) {
    YGGSendMessageToUnityCustom(webGLBlockchainMessageReceiverObjectName, "SendBindWalletFromWebGL", value);
}

/**
 * Handle wallet connection response
 * @param {string} value - Connection response data
 */
function YGGOnReceiveSendConnectWallet(value) {
    YGGSendMessageToUnityCustom(webGLBlockchainMessageReceiverObjectName, "SendConnectWalletFromWebGL", value);
}

/**
 * Set JWT token
 * @param {string} value - JWT token
 */
function YGGOnReceiveSetJwt(value) {
    YGGSendMessageToUnityCustom(defaultObjectName, "SetAccessToken", value);
}

/**
 * Handle browser tab becoming visible
 */
function YGGOnBrowserTabShow() {
    YGGSendMessageToUnityCustom(defaultObjectName, "BrowserTabShow");
}

/**
 * Handle browser tab being hidden
 */
function YGGOnBrowserTabHide() {
    YGGSendMessageToUnityCustom(defaultObjectName, "BrowserTabHide");
}

function YGGOnReceiveWebSocketMessage(value) {
    YGGSendMessageToUnityCustom(defaultObjectName, "SendWebSocketMessageFromWebGL", value);
}

/**
 * Handle game events from window messages
 * @param {MessageEvent} event - Message event
 */
const handleGameEvents = (event) => {
    YGGLog('Received event: ' + JSON.stringify(event.data));
    var message = event.data;
    if (typeof message !== 'object') {
        return;
    }
    const {type, value} = message;
    
    if (type === 'jwt') {
        YGGLog("Set Jwt to game through YGGWebGL.js");
        YGGOnReceiveSetJwt(value)
    }

    if (type === 'responseUserWalletAddress') {
        YGGLog("Get wallet address from game through YGGWebGL.js");
        YGGOnReceiveWalletAddress(value)
    }

    if (type === 'responseConnectWallet') {
        YGGLog("Get wallet connection from game through YGGWebGL.js");
        YGGOnReceiveSendConnectWallet(value)
    }

    if (type === 'responseContractFunction') {
        YGGLog("Get contract function from game through YGGWebGL.js");
        YGGOnReceiveContractFunction(value)
    }
    
    if (type === 'responseEthGetBalance'){
        YGGLog("Get balance from game through YGGWebGL.js");
        YGGOnReceiveContractFunction(value);
    }

    if (type === 'responseBindWallet'){
        YGGLog("Get bind wallet from game through YGGWebGL.js");
        YGGOnReceiveBindWallet(value);
    }

    if (type === 'accountChanged'){
        YGGLog("Get account changed from game through YGGWebGL.js");
        YGGOnReceiveAccountChanged(value);
    }

    if (type === 'vipBundlePurchase'){
        YGGLog("Get vip bundle purchase from game through YGGWebGL.js");
        YGGOnReceiveVipBundlePurchase(value);
    }

    if (type === 'ws'){
        YGGLog("Call websocket message from game through YGGWebGL.js");
        YGGOnReceiveWebSocketMessage(value);
    }
}

/**
 * Handle document visibility change
 */
const handleVisibilityChange = () => {
    var isHidden = document.visibilityState === "hidden";
    if (isHidden) {
        YGGOnBrowserTabHide();
    } else {
        YGGOnBrowserTabShow();
    }
}

// Set up event listeners
function initializeEventListeners() {
    // Orientation change event
    screen.orientation.addEventListener("change", (event) => {
        const type = event.target.type;
        YGGOnOrientationChanged(type);
    });

    // Window resize event
    window.addEventListener("resize", YGGOnGameSizeChanged);

    // Message event
    window.addEventListener('message', handleGameEvents);
    
    // Cleanup on page unload
    window.onbeforeunload = function() {
        window.removeEventListener('message', handleGameEvents);
    }
    
    // Visibility change
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    YGGLog("YGG WebGL event listeners initialized");
}

// Initialize event listeners
initializeEventListeners();
