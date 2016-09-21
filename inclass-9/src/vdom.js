//
// Inclass Virtual DOM Exercise
// ============================
//
// You need to implement createElement() and updateElement()
//
;(function(exports) {

'use strict'

function h(tag, props, ...children) {
    return { tag, props: props ? props : { }, 
        children: Array.isArray(children[0]) ? children[0] : children }
}

function createElement(node) {
	// console.log('Create element called for', node)
	// Add a new element with a tag that is specified by node
	var newElement = document.createElement(node.tag);
	// Add all the children in the node. 
	node.children.forEach(function(childNode) {
		// If it's an object, recursively call this function. 
		// If not, add it to the innerHTML
		if (typeof childNode === 'object') {
			newElement.appendChild(createElement(childNode));
		} else {
			newElement.innerHTML += childNode;
		}
	})
	// Add all the attributes of this tag
	Object.keys(node.props).forEach(function(key) {
		console.log(key)
		var loopKey;
		if (key == 'className') {
			loopKey = 'class';
			newElement.setAttribute(loopKey, node.props[key])
		} else if (key == 'onClick') {
			newElement.addEventListener('onclick', node.props[key], false);
			newElement.addEventListener('onclick', update, false);
		} else {
			loopKey = key;
			newElement.setAttribute(loopKey, node.props[key])
		}
	});
	return newElement;
}

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
            (typeof node1 === 'string' && node1 !== node2) ||
            node1.tag !== node2.tag ||
            (node1.props && node2.props && 
            	node1.props.id && node2.props.id && 
            	node1.props.id != node2.props.id)
}

function updateElement(parent, newNode, oldNode, index=0) {
    if (!oldNode) {
        parent.appendChild(createElement(newNode))
    } else {
    	if (changed(newNode, oldNode)) {
    		parent.removeChild(document.getElementById(oldNode.props.id))
    		parent.appendChild(createElement(newNode))
    	} else {
    		oldNode.children.forEach(function(childNode, arrayIndex) {
				if (changed(childNode, newNode[arrayIndex])) {
					updateElement(oldNode, newNode[arrayIndex], childNode, index+1);
				}
			})
    	}
    }
}

const deepCopy = (obj) => {
    if (obj === null || typeof(obj) !== 'object')
        return obj;
    const props = {}
    if (obj.props) {
        for (let p in obj.props) {
            props[p] = obj.props[p]
        }
    }
    return h(obj.tag, props,
        Array.isArray(obj.children) ? obj.children.map(deepCopy) : obj.children)
}

const update = () => requestAnimationFrame(() => {
	// compare the current vdom with the original vdom for updates
    updateElement(h.mounted.root, h.mounted.current, h.mounted.original)
    h.mounted.original = deepCopy(h.mounted.current)
})

h.mount = (root, component) => {
    // we keep a copy of the original virtual DOM so we can diff it later for updates
    const originalComponent = deepCopy(component)
    h.mounted = { root: root, current: component, original: originalComponent }
    updateElement(root, originalComponent)
}

exports.h = h

})(window);