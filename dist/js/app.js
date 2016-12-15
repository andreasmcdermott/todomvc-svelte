(function () {
'use strict';

var template$1 = (function () {
return {
  data: function data() {
    return {
      filters: []
    }
  }
}
}());

var addedCss$1 = false;
function addCss$1 () {
	var style = document.createElement( 'style' );
	style.textContent = "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               \nfooter[svelte-4025463018], [svelte-4025463018] footer {\n  background-color: white;\n  border-top: 1px solid #DDDDDD;\n  font-size: 0.8em;\n  padding: 0.5em;\n}\n\n.filters[svelte-4025463018], [svelte-4025463018] .filters {\n  width: 40%;\n  margin: 0 auto;\n}\n\n.filter[svelte-4025463018], [svelte-4025463018] .filter {\n  display: inline-block;\n  padding: 0.2em;\n}\n\n.filter.active[svelte-4025463018], [svelte-4025463018] .filter.active {\n  border-bottom: 2px solid red;\n  margin-bottom: -2px;\n}\n\n.remainingCount[svelte-4025463018], [svelte-4025463018] .remainingCount {\n  padding: 0.2em;\n  float: left;\n}\n\n.clearCompleted[svelte-4025463018], [svelte-4025463018] .clearCompleted {\n  padding: 0.2em;\n  float: right;\n}\n";
	document.head.appendChild( style );

	addedCss$1 = true;
}

function renderMainFragment$1 ( root, component ) {
	var footer = document.createElement( 'footer' );
	footer.setAttribute( 'svelte-4025463018', '' );
	
	var span = document.createElement( 'span' );
	span.className = "remainingCount";
	
	footer.appendChild( span );
	var text = document.createTextNode( root.uncompletedItems );
	span.appendChild( text );
	span.appendChild( document.createTextNode( " item" ) );
	var text2 = document.createTextNode( root.uncomplatedItems !== 1 ? 's' : '' );
	span.appendChild( text2 );
	span.appendChild( document.createTextNode( " left" ) );
	footer.appendChild( document.createTextNode( "\n  " ) );
	
	var a = document.createElement( 'a' );
	a.href = "#";
	a.className = "clearCompleted";
	
	footer.appendChild( a );
	a.appendChild( document.createTextNode( "Clear completed" ) );
	footer.appendChild( document.createTextNode( "\n  " ) );
	
	var div = document.createElement( 'div' );
	div.className = "filters";
	
	footer.appendChild( div );
	var eachBlock_anchor = document.createComment( "#each filters" );
	div.appendChild( eachBlock_anchor );
	
	var eachBlock_value = root.filters;
	var eachBlock_iterations = [];
	
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock$1( root, eachBlock_value, eachBlock_value[i], i, component );
		eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
	}

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( footer, anchor );
		},

		update: function ( changed, root ) {
			text.data = root.uncompletedItems;
			
			text2.data = root.uncomplatedItems !== 1 ? 's' : '';
			
			var eachBlock_value = root.filters;
			
			for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
				if ( !eachBlock_iterations[i] ) {
					eachBlock_iterations[i] = renderEachBlock$1( root, eachBlock_value, eachBlock_value[i], i, component );
					eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i].update( changed, root, eachBlock_value, eachBlock_value[i], i );
				}
			}
			
			for ( var i = eachBlock_value.length; i < eachBlock_iterations.length; i += 1 ) {
				eachBlock_iterations[i].teardown( true );
			}
			
			eachBlock_iterations.length = eachBlock_value.length;
		},

		teardown: function ( detach ) {
			for ( var i = 0; i < eachBlock_iterations.length; i += 1 ) {
				eachBlock_iterations[i].teardown( false );
			}
			
			if ( detach ) {
				footer.parentNode.removeChild( footer );
			}
		}
	};
}

function renderEachBlock$1 ( root, eachBlock_value, filter, filter__index, component ) {
	var a = document.createElement( 'a' );
	a.href = "#";
	a.className = "filter";
	
	a.appendChild( document.createTextNode( "Filter" ) );

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( a, anchor );
		},

		update: function ( changed, root, eachBlock_value, filter, filter__index ) {
			var filter = eachBlock_value[filter__index];
		},

		teardown: function ( detach ) {
			if ( detach ) {
				a.parentNode.removeChild( a );
			}
		}
	};
}

function TodoFooter ( options ) {
	options = options || {};

	var component = this;
	var state = Object.assign( template$1.data(), options.data );

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( var key in group ) {
			if ( !( key in newState ) ) { continue; }

			var newValue = newState[ key ];
			var oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) { continue; }

			var callbacks = group[ key ];
			if ( !callbacks ) { continue; }

			for ( var i = 0; i < callbacks.length; i += 1 ) {
				var callback = callbacks[i];
				if ( callback.__calling ) { continue; }

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var this$1 = this;

		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) { return; }

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this$1, data );
		}
	};

	this.get = function get ( key ) {
		return key ? state[ key ] : state;
	};

	this.set = function set ( newState ) {
		var oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) { mainFragment.update( newState, state ); }
		dispatchObservers( observers.deferred, newState, oldState );
	};

	this._mount = function mount ( target, anchor ) {
		mainFragment.mount( target, anchor );
	};

	this.observe = function ( key, callback, options ) {
		var group = ( options && options.defer ) ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( !options || options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel: function () {
				var index = group[ key ].indexOf( callback );
				if ( ~index ) { group[ key ].splice( index, 1 ); }
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		var handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				var index = handlers.indexOf( handler );
				if ( ~index ) { handlers.splice( index, 1 ); }
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	this.root = options.root;
	this.yield = options.yield;

	if ( !addedCss$1 ) { addCss$1(); }
	
	var mainFragment = renderMainFragment$1( state, this );
	if ( options.target ) { this._mount( options.target ); }
}

var template$2 = (function () {
return {
  data: function data() {
    return {
      editing: false,
      item: {
        title: '',
        completed: false
      }
    }
  },
  methods: {
    toggleCompleted: function toggleCompleted(e) {
      this.fire('toggleCompleted', { item: this.get('item') });
      e.preventDefault();
    }
  }
}
}());

var addedCss$2 = false;
function addCss$2 () {
	var style = document.createElement( 'style' );
	style.textContent = "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            \n[type=checkbox][svelte-455872468], [svelte-455872468] [type=checkbox] {\n  position: absolute;\n  left: 0;\n}\n\n[type=text][svelte-455872468], [svelte-455872468] [type=text] {\n  width: calc(100% - 4em);\n  border: none;\n  display: inline-block;\n  margin-left: 2em;\n  font-size: 1em;\n  padding: 0;\n}\n\nlabel[svelte-455872468], [svelte-455872468] label {\n  width: calc(100% - 2em);\n  margin-left: 2em;\n  display: inline-block;\n}\n\nlabel.completed[svelte-455872468], [svelte-455872468] label.completed {\n  text-decoration: line-through;\n  color: #DDDDDD;\n}\n";
	document.head.appendChild( style );

	addedCss$2 = true;
}

function renderMainFragment$2 ( root, component ) {
	var div = document.createElement( 'div' );
	div.setAttribute( 'svelte-455872468', '' );
	div.className = "todo-item";
	
	var input = document.createElement( 'input' );
	input.type = "checkbox";
	input.checked = root.item.completed;
	
	function clickHandler ( event ) {
		component.toggleCompleted(event);
	}
	
	input.addEventListener( 'click', clickHandler, false );
	
	div.appendChild( input );
	div.appendChild( document.createTextNode( "\n  " ) );
	var ifBlock_anchor = document.createComment( "#if editing" );
	div.appendChild( ifBlock_anchor );
	
	function getBlock ( root ) {
		if ( root.editing ) { return renderIfBlock_0$1; }
		return renderIfBlock_1;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );
	
	if ( ifBlock ) { ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor ); }

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( div, anchor );
		},

		update: function ( changed, root ) {
			input.checked = root.item.completed;
			
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) { ifBlock.teardown( true ); }
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) { ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor ); }
			}
		},

		teardown: function ( detach ) {
			input.removeEventListener( 'click', clickHandler, false );
			if ( ifBlock ) { ifBlock.teardown( false ); }
			
			if ( detach ) {
				div.parentNode.removeChild( div );
			}
		}
	};
}

function renderIfBlock_1 ( root, component ) {
	var label = document.createElement( 'label' );
	label.className = root.item.completed ? 'completed' : '';
	
	function dblclickHandler ( event ) {
		component.set({ editing: true });
	}
	
	label.addEventListener( 'dblclick', dblclickHandler, false );
	
	var text = document.createTextNode( root.item.title );
	label.appendChild( text );

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( label, anchor );
		},

		update: function ( changed, root ) {
			label.className = root.item.completed ? 'completed' : '';
			
			text.data = root.item.title;
		},

		teardown: function ( detach ) {
			label.removeEventListener( 'dblclick', dblclickHandler, false );
			
			if ( detach ) {
				label.parentNode.removeChild( label );
			}
		}
	};
}

function renderIfBlock_0$1 ( root, component ) {
	var input = document.createElement( 'input' );
	input.name = "editInput";
	input.type = "text";
	
	var input_updating = false;
	
	function inputChangeHandler () {
		input_updating = true;
		var item = component.get( 'item' );
		item.title = input.value;
		component.set({ item: item });
		input_updating = false;
	}
	
	input.addEventListener( 'input', inputChangeHandler, false );
	input.value = root.item.title;

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( input, anchor );
		},

		update: function ( changed, root ) {
			if ( !input_updating ) { input.value = root.item.title; }
		},

		teardown: function ( detach ) {
			input.removeEventListener( 'input', inputChangeHandler, false );
			
			if ( detach ) {
				input.parentNode.removeChild( input );
			}
		}
	};
}

function TodoItem ( options ) {
	options = options || {};

	var component = this;
	var state = Object.assign( template$2.data(), options.data );

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( var key in group ) {
			if ( !( key in newState ) ) { continue; }

			var newValue = newState[ key ];
			var oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) { continue; }

			var callbacks = group[ key ];
			if ( !callbacks ) { continue; }

			for ( var i = 0; i < callbacks.length; i += 1 ) {
				var callback = callbacks[i];
				if ( callback.__calling ) { continue; }

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var this$1 = this;

		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) { return; }

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this$1, data );
		}
	};

	this.get = function get ( key ) {
		return key ? state[ key ] : state;
	};

	this.set = function set ( newState ) {
		var oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) { mainFragment.update( newState, state ); }
		dispatchObservers( observers.deferred, newState, oldState );
	};

	this._mount = function mount ( target, anchor ) {
		mainFragment.mount( target, anchor );
	};

	this.observe = function ( key, callback, options ) {
		var group = ( options && options.defer ) ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( !options || options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel: function () {
				var index = group[ key ].indexOf( callback );
				if ( ~index ) { group[ key ].splice( index, 1 ); }
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		var handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				var index = handlers.indexOf( handler );
				if ( ~index ) { handlers.splice( index, 1 ); }
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	this.root = options.root;
	this.yield = options.yield;

	if ( !addedCss$2 ) { addCss$2(); }
	
	var mainFragment = renderMainFragment$2( state, this );
	if ( options.target ) { this._mount( options.target ); }
}

TodoItem.prototype = template$2.methods;

function applyComputations ( state, newState, oldState ) {
	if ( ( 'items' in newState && typeof state.items === 'object' || state.items !== oldState.items ) ) {
		state.uncompletedItems = newState.uncompletedItems = template.computed.uncompletedItems( state.items );
	}
}

var template = (function () {
return {
  components: { TodoItem: TodoItem, TodoFooter: TodoFooter },
  methods: {
    addItem: function addItem(e) {
      var items = this.get('items');
      var item = { title: this.get('newTodo'), completed: false };
      this.set({ items: items.concat([item]), newTodo: ''});
      e.preventDefault();
    },
    toggleCompleted: function toggleCompleted(item) {
      console.log(item);
      item.completed = !item.completed;
      this.set({ items: this.get('items') });
    }
  },
  data: function data() {
    return {
      newTodo: '',
      items: []
    }
  },
  computed: {
    uncompletedItems: function (items) { return items.filter(function (item) { return !item.completed; }).length; }
  }
}
}());

var addedCss = false;
function addCss () {
	var style = document.createElement( 'style' );
	style.textContent = "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                \n.todo-list[svelte-352982012], [svelte-352982012] .todo-list {\n  width: 400px;\n  margin: 0 auto;\n  display: block;\n  border: 1px solid #DDDDDD;\n  border-bottom-width: 2px;\n}\n\nheader[svelte-352982012], [svelte-352982012] header {\n  background-color: white;\n  padding: 0 0.5em;\n}\n\n\nsection[svelte-352982012], [svelte-352982012] section {\n  border-top: 1px solid #DDDDDD;\n  padding: 0 0.5em;\n  position: relative;\n  background-color: white;\n}\n\nsection >  [type=checkbox][svelte-352982012], section >  [svelte-352982012] [type=checkbox], section[svelte-352982012] > [type=checkbox], [svelte-352982012] section >  [type=checkbox] {\n  position: absolute;\n  top: -3em;\n}\n\n[type=text][svelte-352982012], [svelte-352982012] [type=text] {\n  width: calc(100% - 2em);\n  margin-left: 2em;\n  padding: 1em 0;\n  border: none;\n  font-size: 1em;\n}\n\ninput[svelte-352982012]:focus, [svelte-352982012] input:focus {\n  outline: none;\n}\n\nul[svelte-352982012], [svelte-352982012] ul {\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n}\n\nli[svelte-352982012], [svelte-352982012] li {\n  position: relative;\n  padding: 0.5em 0;\n}\n\nli[svelte-352982012]:not(:last-child), [svelte-352982012] li:not(:last-child) {\n  border-bottom: 1px dotted #EEEEEE;\n}\n\na[svelte-352982012], [svelte-352982012] a {\n  text-decoration: none;\n  color: blue;\n}\n";
	document.head.appendChild( style );

	addedCss = true;
}

function renderMainFragment ( root, component ) {
	var div = document.createElement( 'div' );
	div.setAttribute( 'svelte-352982012', '' );
	div.className = "todo-list";
	
	var header = document.createElement( 'header' );
	
	div.appendChild( header );
	
	var form = document.createElement( 'form' );
	
	function submitHandler ( event ) {
		component.addItem(event);
	}
	
	form.addEventListener( 'submit', submitHandler, false );
	
	header.appendChild( form );
	
	var input = document.createElement( 'input' );
	
	var input_updating = false;
	
	function inputChangeHandler () {
		input_updating = true;
		component.set({ newTodo: input.value });
		input_updating = false;
	}
	
	input.addEventListener( 'input', inputChangeHandler, false );
	input.value = root.newTodo;
	
	input.type = "text";
	input.placeholder = "What needs to be done?";
	input.autofocus = true;
	
	form.appendChild( input );
	div.appendChild( document.createTextNode( "\n  " ) );
	var ifBlock_anchor = document.createComment( "#if items.length" );
	div.appendChild( ifBlock_anchor );
	
	function getBlock ( root ) {
		if ( root.items.length ) { return renderIfBlock_0; }
		return null;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );
	
	if ( ifBlock ) { ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor ); }

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( div, anchor );
		},

		update: function ( changed, root ) {
			if ( !input_updating ) { input.value = root.newTodo; }
			
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) { ifBlock.teardown( true ); }
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) { ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor ); }
			}
		},

		teardown: function ( detach ) {
			form.removeEventListener( 'submit', submitHandler, false );
			input.removeEventListener( 'input', inputChangeHandler, false );
			if ( ifBlock ) { ifBlock.teardown( false ); }
			
			if ( detach ) {
				div.parentNode.removeChild( div );
			}
		}
	};
}

function renderIfBlock_0 ( root, component ) {
	var section = document.createElement( 'section' );
	
	var input = document.createElement( 'input' );
	input.type = "checkbox";
	
	section.appendChild( input );
	section.appendChild( document.createTextNode( " " ) );
	section.appendChild( document.createTextNode( "\n      " ) );
	
	var ul = document.createElement( 'ul' );
	
	section.appendChild( ul );
	var eachBlock_anchor = document.createComment( "#each items" );
	ul.appendChild( eachBlock_anchor );
	
	var eachBlock_value = root.items;
	var eachBlock_iterations = [];
	
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
		eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
	}
	
	var text2 = document.createTextNode( "\n    \n    " );
	
	var todoFooter_initialData = {
		uncompletedItems: root.uncompletedItems
	};
	var todoFooter = new template.components.TodoFooter({
		target: null,
		root: component.root || component,
		data: todoFooter_initialData
	});

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( section, anchor );
			target.insertBefore( text2, anchor );
			todoFooter._mount( target, anchor );
		},

		update: function ( changed, root ) {
			var eachBlock_value = root.items;
			
			for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
				if ( !eachBlock_iterations[i] ) {
					eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
					eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i].update( changed, root, eachBlock_value, eachBlock_value[i], i );
				}
			}
			
			for ( var i = eachBlock_value.length; i < eachBlock_iterations.length; i += 1 ) {
				eachBlock_iterations[i].teardown( true );
			}
			
			eachBlock_iterations.length = eachBlock_value.length;
			
			var todoFooter_changes = {};
			
			if ( 'uncompletedItems' in changed ) { todoFooter_changes.uncompletedItems = root.uncompletedItems; }
			
			if ( Object.keys( todoFooter_changes ).length ) { todoFooter.set( todoFooter_changes ); }
		},

		teardown: function ( detach ) {
			for ( var i = 0; i < eachBlock_iterations.length; i += 1 ) {
				eachBlock_iterations[i].teardown( false );
			}
			
			todoFooter.teardown( detach );
			
			if ( detach ) {
				section.parentNode.removeChild( section );
				text2.parentNode.removeChild( text2 );
			}
		}
	};
}

function renderEachBlock ( root, eachBlock_value, item, item__index, component ) {
	var li = document.createElement( 'li' );
	
	var todoItem_initialData = {
		item: item
	};
	var todoItem = new template.components.TodoItem({
		target: li,
		root: component.root || component,
		data: todoItem_initialData
	});
	
	todoItem.on( 'toggleCompleted', function ( event ) {
		component.toggleCompleted(event.item);
	});

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( li, anchor );
		},

		update: function ( changed, root, eachBlock_value, item, item__index ) {
			var item = eachBlock_value[item__index];
			
			var todoItem_changes = {};
			
			if ( 'items' in changed ) { todoItem_changes.item = item; }
			
			if ( Object.keys( todoItem_changes ).length ) { todoItem.set( todoItem_changes ); }
		},

		teardown: function ( detach ) {
			todoItem.teardown( false );
			
			if ( detach ) {
				li.parentNode.removeChild( li );
			}
		}
	};
}

function TodoList ( options ) {
	var this$1 = this;

	options = options || {};

	var component = this;
	var state = Object.assign( template.data(), options.data );
applyComputations( state, state, {} );

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( var key in group ) {
			if ( !( key in newState ) ) { continue; }

			var newValue = newState[ key ];
			var oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) { continue; }

			var callbacks = group[ key ];
			if ( !callbacks ) { continue; }

			for ( var i = 0; i < callbacks.length; i += 1 ) {
				var callback = callbacks[i];
				if ( callback.__calling ) { continue; }

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var this$1 = this;

		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) { return; }

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this$1, data );
		}
	};

	this.get = function get ( key ) {
		return key ? state[ key ] : state;
	};

	this.set = function set ( newState ) {
		var this$1 = this;

		var oldState = state;
		state = Object.assign( {}, oldState, newState );
		applyComputations( state, newState, oldState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) { mainFragment.update( newState, state ); }
		dispatchObservers( observers.deferred, newState, oldState );
		
		while ( this.__renderHooks.length ) {
			var hook = this$1.__renderHooks.pop();
			hook.fn.call( hook.context );
		}
	};

	this._mount = function mount ( target, anchor ) {
		mainFragment.mount( target, anchor );
	};

	this.observe = function ( key, callback, options ) {
		var group = ( options && options.defer ) ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( !options || options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel: function () {
				var index = group[ key ].indexOf( callback );
				if ( ~index ) { group[ key ].splice( index, 1 ); }
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		var handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				var index = handlers.indexOf( handler );
				if ( ~index ) { handlers.splice( index, 1 ); }
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	this.root = options.root;
	this.yield = options.yield;

	if ( !addedCss ) { addCss(); }
	this.__renderHooks = [];
	
	var mainFragment = renderMainFragment( state, this );
	if ( options.target ) { this._mount( options.target ); }
	
	while ( this.__renderHooks.length ) {
		var hook = this$1.__renderHooks.pop();
		hook.fn.call( hook.context );
	}
}

TodoList.prototype = template.methods;

var KEY = 'todomvc-amcd';

var store = {
  fetch: function () { return JSON.parse(localStorage.getItem(KEY) || '[]'); },
  save: function (items) { localStorage.setItem(KEY, JSON.stringify(items)); }
};

var todoList = new TodoList({
  target: document.querySelector('main'),
  data: { items: store.fetch() }
});

todoList.observe('items', function (items) {
  store.save(items);
});

}());
