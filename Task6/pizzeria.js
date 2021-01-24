'use strict'
/**
 * Class representing a product.
 */
class Product {
    /**
     * @name types
     * @memberof Product
     * @static
     */
    static types = ['Base','Ingredient','Sauce','Spice'];
    /**
     * Create a product.
     * @param {string} name - The name of the product.
     * @param {number} cost - The cost of the product.
     * @param {number} caloricity - The caloricity of the 100 grams of product.
     * @param {number} portion - The portion of the product.
     * @param {string} type - The type of the product/
     */
    constructor (name, cost, caloricity, portion, type) {
        this.name = name;
        this.cost = cost;
        this.caloricity = caloricity;
        this.portion = portion;
        if(!Product.types.includes(type)) {
            throw new Error ('Incorrect type of product.')
        }
        this.type = type;
        this.currency = 'coins';
        this.kcal = 'kcal';
        this.units = 'grams';
    }
    /**
     * Get a portion caloricity.
     * @return {number} The portion caloricity in kcals.
     */
    get portionCaloricity() {
        return this.caloricity / 100 * this.portion;
    }
    /**
     * Get a string of properties.
     * @return {string} The properties of product.
     */
    getPropertiesString() {
        return `Price: ${this.cost} ${this.currency}, Caloricity (portion): ${this.portionCaloricity.toFixed(2)} ${this.kcal}, Portion: ${this.portion} ${this.units}`;
    }
}

/**
 * Class representing an ingredient.
 * @extends Product
 */
class Ingredient extends Product {
    /**
     * @name types
     * @memberof Ingredient
     * @static
     */
    static types = ['Vegan','Non-vegan'];
    /**
     * Create an ingredient.
     * @param {string} name - The name of the ingredient.
     * @param {number} cost - The cost of the ingredient.
     * @param {number} caloricity - The caloricity of the 100 grams of the ingredient.
     * @param {number} portion - The portion of the ingredient.
     * @param {number} ingredientTypeID - The type of the ingredient.
     */
    constructor (name,cost, caloricity,portion,ingredientTypeID) {
        super(name,cost,caloricity,portion,'Ingredient');
        this.ingredientType = Ingredient.types[ingredientTypeID];
    }
}
/**
 * Class representing an sauce.
 * @extends Product
 */
class Sauce extends Product {
    /**
     * @name types
     * @memberof Sauce
     * @static
     */
    static types = ['Sweet','Hot','Asian'];
    /**
     * Create an sauce.
     * @param {string} name - The name of the sauce.
     * @param {number} cost - The cost of the sauce.
     * @param {number} caloricity - The caloricity of the 100 grams of the sauce.
     * @param {number} portion - The portion of the sauce.
     * @param {number} sauceTypeID - The type of the sauce.
     */
    constructor (name,cost, caloricity,portion,sauceTypeID) {
        super(name,cost,caloricity,portion,'Sauce');
        this.sauceType = Sauce.types[sauceTypeID];
    }
}
/**
 * Class representing an spice.
 * @extends Product
 */
class Spice extends Product {
    /**
     * @name types
     * @memberof Spice
     * @static
     */
    static types = ['Hot','Medium','Mild'];
    /**
     * Create an spice.
     * @param {string} name - The name of the spice.
     * @param {number} cost - The cost of the spice.
     * @param {number} caloricity - The caloricity of the 100 grams of the spice.
     * @param {number} portion - The portion of the spice.
     * @param {number} spiceTypeID - The type of the spice.
     */
    constructor (name,cost,caloricity,portion,spiceTypeID) {
        super(name,cost,caloricity,portion,'Spice');
        this.spiceType = Spice.types[spiceTypeID];
    }
}
/**
 * Class representing a type of base.
 */
class BaseType {
    /**
     * Create a base type.
     * @param {string} typeName - The name of the base type.
     * @param {number} cost - The cost of the base type.
     * @param {number} caloricity The caloricity of the base type.
     * @param {number} portion The portion of the base type.
     */
    constructor(typeName,cost,caloricity,portion) {
        this.name = typeName;
        this.cost = cost;
        this.caloricity = caloricity;
        this.portion = portion;
    }
}
/**
 * Class representing a size of base.
 */
class BaseSize {
    /**
     * Create a base size;
     * @param {string} name - The name of the base size.
     * @param {number} factor - The factor of the base size.
     */
    constructor(name,factor) {
        this.name = name;
        this.factor = factor;
    }
}
/**
 * Class representing a base.
 * @extends Product
 */
class Base extends Product {
    /**
     * @name types
     * @memberof Base
     * @static
     */
    static types = [
        new BaseType('Thin',25,100,200),
        new BaseType('Thick',30,200,350),
        new BaseType('Puff',27,120,200),
        new BaseType('Calzone',30,140,250),
        new BaseType('Italian',29,110,240),
    ];
    /**
     * @name sizes
     * @memberof Base
     * @static
     */
    static sizes = [ 
        new BaseSize('Small',0.75),
        new BaseSize('Medium',1),
        new BaseSize('Large',1.25) 
    ];  
    /**
     * Create a pizza base.
     * @param {number} typeID - The ID of the base type.
     * @param {number} sizeID - The ID of the base size.
     */
    constructor (typeID,sizeID) {
        const size = Base.sizes[sizeID] || null;
        const baseType = Base.types[typeID] || null;
        if (baseType && size) {
            super(baseType.name,baseType.cost*size.factor,baseType.caloricity*size.factor,baseType.portion*size.factor,'Base');
        } else {
            throw new Error('Base constructor can`t get undefined names of props');
        }
    }
}
/** 
 * Class representing a pizza. 
 */
class Pizza {
    /**
     * Create a pizza.
     * @param {Array.<Product>} ingredients - The ingredients which used in pizza.
     */
    constructor (ingredients) {
        this.ingredients = ingredients;
        const ingredientsCost = this.getIngredientsCost(this.ingredients);
        this.totalCost = this.getTotalCost(ingredientsCost).toFixed(2);
        this.totalCaloricity = this.getIngredientsCaloricity(this.ingredients).toFixed(1);
    }
    /**
     * Get ingredients cost.
     * @param {Array.<Product>} ingredients - The ingredients which used in pizza.
     * @return {number} The cost of ingredients.
     */
    getIngredientsCost (ingredients) {
        return ingredients.map(ingredient => +ingredient.cost)
                .reduce((acc,ingredientCost) => acc + ingredientCost);
    }
    /**
     * Get ingredients caloricity.
     * @param {Array.<Product>} ingredients - The ingredients which used in pizza.
     * @return {number} The caloricity of ingredients.
     */
    getIngredientsCaloricity (ingredients) {
        return ingredients.map(ingredient => +ingredient.caloricity)
                .reduce((acc,ingredientCaloricity) => acc + ingredientCaloricity);
    }
    /**#@+
     * @memberof Pizza
     * @static
     */
    static k1;
    static k2;
    static get K1 () {
        return Pizza.k1;
    }
    static set K1 (costBorder) {
        if (costBorder <= 0) {
            throw new Error('Cost can`t be nonpositive');
        } else {
            Pizza.k1 = costBorder;
        }
    }
    static get K2 () {
        return Pizza.k2;
    }
    static set K2 (costBorder) {
        if (costBorder <= 0) {
            throw new Error('Cost can`t be nonpositive');
        } else {
            Pizza.k2 = costBorder;
        }
    }

    static MARKUP_LESS_K1 = 0.2;
    static MARKUP_BETWEEN_K1_K2 = 0.15;
    static MARKUP_MORE_K2 = 0.1;
    /**#@-*/
    /**
     * Get the markup of the pizza.
     * @param {number} cost - The cost of the pizza. 
     * @return {number} The markup of the pizza, in part from one.
     */
    getMarkUp(cost) {
        if (!(Pizza.K1 || Pizza.K2)) {
            throw new Error('Cost Borders are undefined');
        }
        if (cost < Pizza.K1) {
            return Pizza.MARKUP_LESS_K1;
        } else if (cost >= Pizza.K1 && cost <= Pizza.K2 ) {
            return Pizza.MARKUP_MORE_K1;
        } else if (cost > Pizza.K2) {
            return Pizza.MARKUP_MORE_K2;
        }
    }
    /**
     * Get a total cost of ingredients.
     * @param {number} ingredientCost - The cost of the ingredient.
     * @return {number} The total cost of pizza ingredients, in coins.
     */
    getTotalCost (ingredientsCost) {
        const markup = this.getMarkUp(+ingredientsCost);
        return ingredientsCost * ( 1 + markup );
    }
}

// Create style sheet
let sheet = (function() {
	// Create the <style> tag
	let style = document.createElement("style");
	// WebKit hack :(
	style.appendChild(document.createTextNode(""));
	// Add the <style> element to the page
	document.head.appendChild(style);
	return style.sheet;
})();
/**
 * Add a CSS rule to the style sheet.
 * @param {CSSStyleSheet} sheet - The style sheet of the page.
 * @param {string} selector - The selector of the CSS rule.
 * @param {string} rules - The CSS rule.
 * @param {number} [index=0] - The index of the CSS rule.
 */
function addCSSRule(sheet, selector, rules, index=0) {
	if("insertRule" in sheet) {
		sheet.insertRule(selector + "{" + rules + "}", index);
	}
	else if("addRule" in sheet) {
		sheet.addRule(selector, rules, index);
	}
}
//Create CSS rules
addCSSRule(sheet,'*','font-size: 1.05em; user-select:none;')
addCSSRule(sheet,'form','margin: 0 auto; width: 70%;');
addCSSRule(sheet,'details','width: 90%;transition-duration:2.4s; padding: 5px; background-color: rgb(200,200,200);');
addCSSRule(sheet,'.products-list-title','background-color: rgb(180,160,120); padding:5px; ');
addCSSRule(sheet,'.product-checkbox','display:none;');
addCSSRule(sheet,'.product-radio','display:none;');
addCSSRule(sheet,'.product-info-container','display:block;');
addCSSRule(sheet,'.product-label','transition-duration:0.4s; margin: 2px 20px; cursor:pointer; padding: 10px 5px; display: flex; justify-content:center;place-content: space-evenly; flex-direction:row;  outline: 1px solid black; outline-offset: -1px; user-select: none; background-color: rgb(250,240,245);');
addCSSRule(sheet,'.product-checkbox:checked +label','background-color: rgb(150,160,200);');
addCSSRule(sheet,'.product-radio:checked +label','background-color: rgb(150,160,200);');
addCSSRule(sheet,'.product-label:hover','opacity:0.8;');
addCSSRule(sheet,'.product-name','display:block; ');
addCSSRule(sheet,'.product-properties','display:block; font-size:smaller');
addCSSRule(sheet,'.base-radio-container','display:block;margin:10px;');
addCSSRule(sheet,'.base-radio-title','display:block; width: 100%; text-align: center;');

//Create body
let constructorContainer = document.createElement('div');
constructorContainer.classList.add('constructor-container');
let productsContainer = document.createElement('div');
productsContainer.classList.add('products-container');
constructorContainer.appendChild(productsContainer);

let submitBtn = document.createElement('input');
submitBtn.type = 'submit';
submitBtn.value = 'Create Pizza';
submitBtn.classList.add('pizza-submit');
let form = document.createElement('form');
form.appendChild(constructorContainer);
form.appendChild(submitBtn);
form.addEventListener('submit',pizzaCreatorHandler);
document.body.appendChild(form);

//Create logic
/**
 * @name products
 * @constant
 * @global
 */
const products = [
    new Ingredient('Tomatoes',8,10,20,0),
    new Ingredient('Onion',9,50,20,0),
    new Ingredient('Salt cucumbers',12,20,25,0),
    new Ingredient('Bell papper',16,15,25,0),
    new Ingredient('Corn',17,105,20,0),
    new Ingredient('Champignon',20,25,20,0),
    new Ingredient('Pineapple',20,55,30,0),
    new Ingredient('Cheese',14,350,40,1),
    new Ingredient('Chiken',16,210,40,1),
    new Ingredient('Ham',17,365,30,1),
    
    new Sauce('Mayonnaise',8,600,10,0),
    new Sauce('Ketchup',9,112,15,0),
    new Sauce('Barbecue sauce',10,52,10,0),
    
    new Spice('Bay leaf',10,20,3,2),
    new Spice('Thyme',10,20,3,1),
    new Spice('Parsley',10,20,3,2),
    new Spice('Rosemary',10,20,3,0),
    new Spice('Cardamom',10,20,3,1),
    new Spice('Coriander',10,20,3,2),
    new Spice('Fennel',10,20,3,2),
    new Spice('Oregano',10,20,3,0),
    new Spice('Basil',10,20,3,1)
];
/**
 * @name products
 * @global
 */
let pizza;
Pizza.K1 = 100;
Pizza.K2 = 150;

loadProducts();
Array.from(document.getElementsByTagName('details'))
    .forEach( el => el.addEventListener('click',changeDetailHandler));
/**
 * Submit form.
 * @param {Event} e - The event of the document. 
 */
function pizzaCreatorHandler(e) {
    e.preventDefault();
    let pizzaContainer = getUsedIngredients();
    if(pizzaContainer.length != 0) {
        pizza = new Pizza(pizzaContainer);
    } else {
        throw new Error('Can not create pizza. Ingredients list is empty.');
    }
    sendToServer(pizza);
    console.log(pizza);
}
/**
 * Send pizza info to the server.
 * @param {Pizza} pizza - The created pizza.
 */
async function sendToServer(pizza) {
    let json = JSON.stringify(pizza);
    let response = await fetch('server.php', {
        method: 'POST',
        body: json,
      })
    .then(response => response.text())
    .catch(err => console.error(err))
    alert(response || "Server isn't available!")
}
/**
 * Get ingredients used in pizza.
 * @return {Array.<Product>} The ingredients of the pizza.
 */
function getUsedIngredients() {
    let sizeID,typeID,pizzaContainer = [];
    Array.from(form.elements)
        .filter(el => (el.type == 'checkbox' || el.type == 'radio') && el.checked == true)
        .forEach( el => {
            if (el.classList.contains('base-type')) {
                typeID = el.value;
            } else if (el.classList.contains('base-size')) {
                sizeID = el.value;
            } else if (el.classList.contains('product-checkbox')){
                let productName = el.id.split('-')[1];
                let currentProduct = products.find(product => product.name.toLowerCase() == productName );
                pizzaContainer.push(currentProduct);
            } else {
                throw new Error('Incorrect input type of pizza product.');
            }
        });
    if(!isNaN(sizeID) && !isNaN(typeID)) {
        let base = new Base(typeID,sizeID);
        pizzaContainer.push(base);
    } else {
        throw new Error('Pizza base was not selected correctly.');
    }
    return pizzaContainer;
}
/**
 * Load products to the page.
 */
function loadProducts() {
    if (products.length > 0) {
        for (let prodType in Product.types) {
            const curProductType = Product.types[prodType];
            let productsList = document.createElement('details');
            setDetailsHeader(productsList,curProductType);
            productsList.classList.add('products-list',curProductType.toLowerCase());
            if (curProductType == 'Base') {
                productsList.open = true;
                let typeRadioBlock = createBaseRadio('base-type','Type',Base.types);
                let sizeRadioBlock = createBaseRadio('base-size','Size',Base.sizes);
                productsList.appendChild(typeRadioBlock);
                productsList.appendChild(sizeRadioBlock);
            } else if (products && products.length > 0) {
                products.forEach((product) => {
                    if (productsList.classList.contains(product.type.toLowerCase())) {
                        let prodInfo = document.createElement('span');
                        prodInfo.classList.add('product-info-container');
                        let prodCheckbox = document.createElement('input');
                        prodCheckbox.type = 'checkbox';
                        prodCheckbox.value = `${product.cost}:${product.portionCaloricity}`;
                        prodCheckbox.classList.add('product-checkbox');
                        prodCheckbox.id = product.type.toLowerCase() + '-' + product.name.toLowerCase();
                        let prodContainer = document.createElement('label');
                        prodContainer.classList.add('product-label', curProductType.toLowerCase());
                        prodContainer.htmlFor = product.type.toLowerCase() + '-' + product.name.toLowerCase();
                        let name = document.createElement('span');
                        name.classList.add('product-name');
                        let props = document.createElement('span');
                        props.classList.add('product-properties');
                        name.textContent = product.name;
                        props.textContent = product.getPropertiesString();
                        prodContainer.appendChild(name);
                        prodContainer.appendChild(props);
                        prodInfo.appendChild(prodCheckbox);
                        prodInfo.appendChild(prodContainer);
                        productsList.appendChild(prodInfo);
                    }
                });
            } else {
                productsList.textContent = 'There are no products of this type.';
            }
            productsContainer.appendChild(productsList);
        }
    } else {
        throw Error('Products list is empty.');
    }      
}
/**
 * Set a header of details.
 * @param {HTMLElement} details - The products list container.
 * @param {string} name - The name of the details.
 */
function setDetailsHeader(details,name) {
    let summary = document.createElement('summary');
    summary.classList.add('products-list-title');
    summary.textContent = name;
    details.appendChild(summary);
}
/**
 * Create a block of radio elements.
 * @param {string} name - The name of the radios space.
 * @param {string} title - The title of the radio.
 * @param {Array.<string>} list - The list of the radios.
 * @return {HTMLElement} The block of the radio elements.  
 */
function createBaseRadio(name,title,list) {
    let titleBlock = document.createElement('span');
    titleBlock.textContent = title;
    titleBlock.classList.add('base-radio-title');
    let radioBlock = document.createElement('span');
    radioBlock.appendChild(titleBlock);
    radioBlock.classList.add('base-radio-container');
    if(list && list.length > 0) {
        list.forEach((base,index) => {
            let radio = document.createElement('input');
            radio.type = 'radio';
            radio.value = index;
            radio.name = name + '-radio';
            radio.id = 'base-' + base.name.toLowerCase();
            radio.classList.add('product-radio',name);
            let label = document.createElement('label');
            label.htmlFor = 'base-' + base.name.toLowerCase();
            label.classList.add('product-label');
            label.textContent = base.name;
            if (index == 0) {
                radio.checked = true;
            }
            radioBlock.appendChild(radio);
            radioBlock.appendChild(label);
        });
    } else {
        radioBlock.textContent = 'There are no products of this type.';
        throw new Error('Can not create pizza without base');
    }
    return radioBlock;
}
/**
 * @name prevDetails
 * @global
 */
let prevDetails;
/**
 * Close non-active details.
 * @param {Event} e - THe event of the page.
 */
function changeDetailHandler(e) {
    const curTag = e.currentTarget;
    const detailsArray = Array.from(document.getElementsByTagName('details'));
    if(!prevDetails) prevDetails = detailsArray.find(tag => tag.open == true);
    if (prevDetails != curTag) {
        prevDetails.open = false;
    }
    prevDetails = curTag;
}


