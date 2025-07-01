/**
 * YGGCommon.js
 * Common utility functions for YGG Unity WebGL integration
 */

// Default object names used for Unity communication
const defaultObjectName = "UnityWebGLMessageReceiver";
const webGLBlockchainMessageReceiverObjectName = "WebGLBlockchainMessageReceiver";

/**
 * Send message to Unity with default object and function name
 * @param {any} msg - Message to send to Unity
 */
function YGGSendMessageToUnity(msg) {
    if(window.unityInstance) {
        window.unityInstance.SendMessage(defaultObjectName, "Dispatcher", msg);
    }
}

/**
 * Send message to Unity with custom object and function name
 * @param {string} objectName - Unity GameObject name
 * @param {string} functionName - Function name to call
 * @param {any} msg - Message to send to Unity (optional)
 */
function YGGSendMessageToUnityCustom(objectName, functionName, msg) {
    if(window.unityInstance) {
        window.unityInstance.SendMessage(objectName, functionName, msg);
    }
}

/**
 * Log message with YGG prefix
 * @param {string} message - Message to log
 */
function YGGLog(message) {
    console.log(`[YGG] ${message}`);
}

// Export common functions and constants
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        defaultObjectName,
        webGLBlockchainMessageReceiverObjectName,
        YGGSendMessageToUnity,
        YGGSendMessageToUnityCustom,
        YGGLog
    };
}

// Make functions globally available
window.YGGSendMessageToUnity = YGGSendMessageToUnity;
window.YGGSendMessageToUnityCustom = YGGSendMessageToUnityCustom;
window.YGGLog = YGGLog;

class YGGCommon {
    /**
     * Safely execute a function by name
     * @param {string} functionName - The name of the function to call
     * @param {any} param - Parameter to pass to the function
     * @returns {any} - Result of the function call or null if function doesn't exist
     */
    static callFunction(functionName, param) {
        if (typeof window[functionName] === 'function') {
            return window[functionName](param);
        } else {
            console.warn(`Function ${functionName} is not defined`);
            return null;
        }
    }

    /**
     * Parse JSON safely
     * @param {string} jsonStr - JSON string to parse
     * @returns {object|null} - Parsed object or null if parsing fails
     */
    static parseJSON(jsonStr) {
        try {
            return JSON.parse(jsonStr);
        } catch (e) {
            console.error("Error parsing JSON:", e);
            return null;
        }
    }

    /**
     * Get a query parameter from the URL
     * @param {string} name - Parameter name
     * @returns {string|null} - Parameter value or null if not found
     */
    static getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    /**
     * Log a message to console with prefix
     * @param {string} message - Message to log
     */
    static log(message) {
        console.log(`[YGG] ${message}`);
    }
}

// Export the class
if (typeof module !== 'undefined' && module.exports) {
    module.exports = YGGCommon;
} 
