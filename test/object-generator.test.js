'use strict';

const chai = require('chai');
const expect = chai.expect;
const Document = require('../lib/document');
const ObjectGenerator = require('../lib/object-generator');

describe('ObjectGenerator', function() {
  describe('#generate', function() {
    context('when an element is removed', function() {
      var object = { name: 'test' };
      var doc = new Document(object);

      before(function() {
        doc.elements.at(0).remove();
      });

      it('does not include the element in the object', function() {
        expect(ObjectGenerator.generate(doc.elements)).to.deep.equal({});
      });
    });

    context('when an element is blank', function() {
      var object = { name: 'test' };
      var doc = new Document(object);

      before(function() {
        doc.elements.at(0).rename('');
      });

      it('does not include the element in the object', function() {
        expect(ObjectGenerator.generate(doc.elements)).to.deep.equal({});
      });
    });

    context('when the element is null', function() {
      it('returns null', function() {
        expect(ObjectGenerator.generate(null)).to.equal(null);
      });
    });

    context('when the element is undefined', function() {
      it('returns undefined', function() {
        expect(ObjectGenerator.generate(undefined)).to.equal(undefined);
      });
    });
  });

  describe('#generateOriginal', function() {
    context('when an element is removed', function() {
      var object = { name: 'test' };
      var doc = new Document(object);

      before(function() {
        doc.elements.at(0).remove();
      });

      it('includes the original element in the object', function() {
        expect(ObjectGenerator.generateOriginal(doc.elements)).to.deep.equal(object);
      });
    });

    context('when an element is blank', function() {
      var object = { name: 'test' };
      var doc = new Document(object);

      before(function() {
        doc.elements.at(0).rename('');
      });

      it('includes the original element in the object', function() {
        expect(ObjectGenerator.generateOriginal(doc.elements)).to.deep.equal(object);
      });
    });

    context('when the element is null', function() {
      it('returns null', function() {
        expect(ObjectGenerator.generateOriginal(null)).to.equal(null);
      });
    });

    context('when the element is undefined', function() {
      it('returns undefined', function() {
        expect(ObjectGenerator.generateOriginal(undefined)).to.equal(undefined);
      });
    });
  });

  describe('#generateSetUpdate', function() {
    context('when an element is removed', function() {
      var object = { name: 'test' };
      var doc = new Document(object);

      before(function() {
        doc.elements.at(0).remove();
      });

      it('does not include the element in the object', function() {
        expect(ObjectGenerator.generateSetUpdate(doc.elements)).to.deep.equal({});
      });
    });

    context('when nothing is changed', function() {
      var object = { name: 'test' };
      var doc = new Document(object);

      it('returns an empty object', function() {
        expect(ObjectGenerator.generateSetUpdate(doc.elements)).to.deep.equal({});
      });
    });

    context('when an element is blank', function() {
      var object = { name: 'test' };
      var doc = new Document(object);

      before(function() {
        doc.elements.at(0).rename('');
      });

      it('does not include the element in the object', function() {
        expect(ObjectGenerator.generateSetUpdate(doc.elements)).to.deep.equal({});
      });
    });

    context('when an element is renamed', function() {
      var object = { name: 'test' };
      var doc = new Document(object);

      before(function() {
        doc.elements.at(0).rename('aa');
      });

      it('includes the element in the object', function() {
        expect(ObjectGenerator.generateSetUpdate(doc.elements)).to.deep.equal({
          aa: 'test'
        });
      });
    });

    context('when a nested element is edited', function() {
      var object = {
        name: {
          first: 'jimmy',
          last: 'hendrix'
        }
      };
      var doc = new Document(object);

      before(function() {
        doc.get('name').get('last').edit('aa');
      });

      it('includes the element in the object', function() {
        expect(ObjectGenerator.generateSetUpdate(doc.elements)).to.deep.equal({
          name: {
            first: 'jimmy',
            last: 'aa'
          }
        });
      });
    });

    context('when a nested element is renamed', function() {
      var object = {
        name: {
          first: 'jimmy',
          last: 'hendrix'
        }
      };
      var doc = new Document(object);

      before(function() {
        doc.get('name').get('last').rename('aa');
      });

      it('includes the element in the object', function() {
        expect(ObjectGenerator.generateSetUpdate(doc.elements)).to.deep.equal({
          name: {
            first: 'jimmy',
            aa: 'hendrix'
          }
        });
      });
    });

    context('when the element is null', function() {
      it('returns null', function() {
        expect(ObjectGenerator.generateSetUpdate(null)).to.equal(null);
      });
    });

    context('when the element is undefined', function() {
      it('returns undefined', function() {
        expect(ObjectGenerator.generateSetUpdate(undefined)).to.equal(undefined);
      });
    });
  });

  describe('#generateUnsetUpdate', function() {
    context('when an element is removed', function() {
      var object = { name: 'test' };
      var doc = new Document(object);

      before(function() {
        doc.elements.at(0).remove();
      });

      it('includes the key in the object', function() {
        expect(ObjectGenerator.generateUnsetUpdate(doc.elements)).to.deep.equal({
          name: true
        });
      });
    });

    context('when nothing is changed', function() {
      var object = { name: 'test' };
      var doc = new Document(object);

      it('returns an empty object', function() {
        expect(ObjectGenerator.generateUnsetUpdate(doc.elements)).to.deep.equal({});
      });
    });

    context('when an element is blank', function() {
      var object = { name: 'test' };
      var doc = new Document(object);

      before(function() {
        doc.elements.at(0).rename('');
      });

      it('includes the original key in the object', function() {
        expect(ObjectGenerator.generateUnsetUpdate(doc.elements)).to.deep.equal({
          name: true
        });
      });
    });

    context('when an element is renamed', function() {
      var object = { name: 'test' };
      var doc = new Document(object);

      before(function() {
        doc.elements.at(0).rename('aa');
      });

      it('includes the original key in the object', function() {
        expect(ObjectGenerator.generateUnsetUpdate(doc.elements)).to.deep.equal({
          name: true
        });
      });
    });

    context('when a nested element is edited', function() {
      var object = {
        name: {
          first: 'jimmy',
          last: 'hendrix'
        }
      };
      var doc = new Document(object);

      before(function() {
        doc.get('name').get('last').edit('aa');
      });

      it('returns empty object', function() {
        expect(ObjectGenerator.generateUnsetUpdate(doc.elements)).to.deep.equal({});
      });
    });

    context('when a nested element is removed', function() {
      var object = {
        name: {
          first: 'jimmy',
          last: 'hendrix'
        }
      };
      var doc = new Document(object);

      before(function() {
        doc.get('name').get('last').remove();
      });

      it('does not include the element in the object', function() {
        expect(ObjectGenerator.generateUnsetUpdate(doc.elements)).to.deep.equal({});
      });
    });

    context('when the element is null', function() {
      it('returns null', function() {
        expect(ObjectGenerator.generateUnsetUpdate(null)).to.equal(null);
      });
    });

    context('when the element is undefined', function() {
      it('returns undefined', function() {
        expect(ObjectGenerator.generateUnsetUpdate(undefined)).to.equal(undefined);
      });
    });
  });

  describe('#generateArray', function() {
    var object = { names: [ 'a', 'b', 'c' ]};
    var doc = new Document(object);

    context('when an element is removed', function() {
      before(function() {
        doc.elements.at(0).elements.at(1).remove();
      });

      it('does not include the element in the object', function() {
        expect(ObjectGenerator.generateArray(doc.elements.at(0).elements)).to.deep.equal([ 'a', 'c' ]);
      });
    });

    context('when the element is null', function() {
      it('returns null', function() {
        expect(ObjectGenerator.generateArray(null)).to.equal(null);
      });
    });

    context('when the element is undefined', function() {
      it('returns undefined', function() {
        expect(ObjectGenerator.generateArray(undefined)).to.equal(undefined);
      });
    });
  });

  describe('#generateOriginalArray', function() {
    var object = { names: [ 'a', 'b', 'c' ]};
    var doc = new Document(object);

    context('when an element is removed', function() {
      before(function() {
        doc.elements.at(0).elements.at(1).remove();
      });

      it('includes the original element in the object', function() {
        expect(ObjectGenerator.generateOriginalArray(doc.elements.at(0).elements)).to.deep.equal([ 'a', 'b', 'c' ]);
      });
    });

    context('when the element is null', function() {
      it('returns null', function() {
        expect(ObjectGenerator.generateOriginalArray(null)).to.equal(null);
      });
    });

    context('when the element is undefined', function() {
      it('returns undefined', function() {
        expect(ObjectGenerator.generateOriginalArray(undefined)).to.equal(undefined);
      });
    });
  });
});
