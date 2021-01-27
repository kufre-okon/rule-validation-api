const helper = {
    isValidJson: function(jsonString) {
        try {
            if (this.isObject(jsonString))
                return true;
            JSON.parse(jsonString);
            return true;
        } catch (err) {
            return false;
        }
    },
    isString: function(obj) {
        return Object.prototype.toString.call(obj) === "[object String]"
    },
    isObject: function(obj) {
        return typeof obj === 'object' && obj !== null
    }
}

module.exports = { helper }