'use strict';

/**
 * Generates javascript objects from elements.
 */
class ObjectGenerator {
  /**
   * Generate a javascript object from the elements.
   *
   * @param {Array} elements - The elements.
   *
   * @returns {Object} The javascript object.
   */
  generate(elements) {
    if (elements) {
      var object = {};
      for (let element of elements) {
        if (!element.isRemoved() && element.currentKey !== '') {
          object[element.currentKey] = element.generateObject();
        }
      }
      return object;
    }
    return elements;
  }

  // TODO: docs
  generateOriginal(elements) {
    if (elements) {
      var object = {};
      for (let element of elements) {
        if (element.key !== '') {
          object[element.key] = element.generateOriginalObject();
        }
      }
      return object;
    }
    return elements;
  }

  /**
   * Generate a javascript object reflecting the updates from the elements.
   *
   * @param {Array} elements - The elements.
   *
   * @returns {Object} The javascript update object.
   */
  generateSetUpdate(elements) {
    if (elements) {
      var object = {};
      for (let element of elements) {
        if (
          !element.isRemoved()
          && element.currentKey !== ''
          && element.isModified()
        ) {
          // Include the full modified element. This way if a nested field
          // has been altered (changed/added/removed) it is set at the top
          // most level and exists in the set update document.
          object[element.currentKey] = element.generateObject();
        }
      }
      return object;
    }
    return elements;
  }

  /**
   * Generate a javascript object reflecting the removals from the elements.
   *
   * @param {Array} elements - The elements.
   *
   * @returns {Object} The javascript unset update object.
   */
  generateUnsetUpdate(elements) {
    if (elements) {
      var object = {};
      for (let element of elements) {
        if (element.isRemoved() && element.currentKey !== '') {
          object[element.currentKey] = true;
        }
        // TODO: why the check for empty key.
        if (element.isRenamed() && element.currentKey !== '') {
          object[element.key] = true;
        }
      }
      return object;
    }
    return elements;
  }

  // TODO docs
  getOriginalKeysAndValuesForFieldsThatWereUpdated(elements) {
    if (elements) {
      var object = {};
      for (let element of elements) {
        if (element.isModified() && element.key !== '') {
          // Using `.key` instead of `.currentKey` to ensure we look at
          // the original field's value.
          object[element.key] = element.generateOriginalObject();
        }
      }
      return object;
    }
    return elements;
  }

  /**
   * Generate an array from the elements.
   *
   * @param {Array} elements - The elements.
   *
   * @returns {Array} The array.
   */
  generateArray(elements) {
    if (elements) {
      var array = [];
      for (let element of elements) {
        if (!element.isRemoved()) {
          if (element.elements) {
            array.push(element.generateObject());
          } else {
            array.push(element.currentValue);
          }
        }
      }
      return array;
    }
    return elements;
  }

  // TODO
  generateOriginalArray(elements) {
    if (elements) {
      var array = [];
      for (let element of elements) {
        if (element.elements) {
          array.push(element.generateOriginalObject());
        } else {
          array.push(element.value);
        }
      }
      return array;
    }
    return elements;
  }
}

module.exports = new ObjectGenerator();
