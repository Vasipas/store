import React from 'react'

const StateContext = React.createContext()

class StateProvider extends React.Component {
        state = {
            cartOpen: false,
            categoryList: '',
            selectedCategory: '',
            currencyList: '',
            selectedCurrency: '',
            productId: '',
            cart: [],
            candidateToCart: '',
        }

    setCategories = (categories) => {
        if(!this.state.categoryList) {
            this.setState( {
                categoryList: categories})
            let categoryList = (JSON.parse(sessionStorage.getItem('categories')))[0].name
            if(categoryList === null) {
                categoryList = categories[0].name
            }
            this.setState({selectedCategory: categoryList})
            }
        else return
    }
    showCategory = () => {
            let category = sessionStorage.getItem('category')
        if(category === null) {
            category = this.state.selectedCategory
        }
        return category
    }
    changeCategory = (category) => {
            sessionStorage.setItem('category', category)
        this.setState({selectedCategory: category})
    }
    setCurrencies = (currencies) => {
        if(!currencies) return
        if(!this.state.currencyList) {
            this.setState({currencyList: currencies})
            let currency = JSON.parse(sessionStorage.getItem('currency'))
            if(currency === null) {
                currency = currencies[0]
            }
            let defaultCurrency = currency
            this.setState({selectedCurrency: defaultCurrency})
        } else return
    }
    changeCurrency = (currency) => {
            sessionStorage.setItem('currency', JSON.stringify(currency))
        this.setState({selectedCurrency: currency})
    }
    getProductId = () => {
        return this.state.productId
    }
    addToCart = (product) => {
        let cartCopy = JSON.parse(sessionStorage.getItem('cart'))
        if(cartCopy === null) {
            cartCopy = JSON.parse(JSON.stringify(this.state.cart))
        }
        let productCopy = JSON.parse(JSON.stringify(product))
        let itemInCart = cartCopy.find(item => {
            return (item.id === productCopy.id && JSON.stringify(item.selectedAttrs) === JSON.stringify(productCopy.selectedAttrs))
        })
        if(itemInCart) {
            itemInCart.count+=1
        }
        else {
            cartCopy.push(productCopy)
        }
        sessionStorage.setItem('cart', JSON.stringify(cartCopy))
        return this.setState(state => ({cart: cartCopy}))
    }
    setCandidateToCart = (product) => {
            let candidate = JSON.parse(sessionStorage.getItem('product'))
        if(candidate === null) {
            candidate = product
        }
        this.setState({candidateToCart: candidate, productId: candidate.id})
    }
    getCandidate = () => {
            if(!this.state.candidateToCart) {
                this.setState({candidateToCart: JSON.parse(sessionStorage.getItem('product'))})}
            return this.state.candidateToCart
    }
    changeCandidateAttrValue = (value) => {
            this.setState(state => {
                let attribute = this.state.candidateToCart.selectedAttrs.find(attr => {
                    return (attr.attrId === value.attrId)})
                attribute.attrValue = value.attrValue
            })
    }
    changeCartItemAttrValue = (value) => {
        let cart = []
        let cartCopy = JSON.parse(sessionStorage.getItem('cart'))
        if(cartCopy === null) {
            cartCopy = JSON.parse(JSON.stringify(this.state.cart))
        }
        let attribute = cartCopy[value.cartIndex].selectedAttrs.find(attr => {
            return (attr.attrId === value.attrId)})
        attribute.attrValue = value.attrValue
        for(let i = 0; i < cartCopy.length; i++) {
            if(i === 0) {
                cart.push(cartCopy[i])
            } else {
                let itemInCart = cart.find(item => {
                    return (item.id === cartCopy[i].id &&
                        JSON.stringify(item.selectedAttrs) ===JSON.stringify(cartCopy[i].selectedAttrs))
                })
                if(itemInCart) itemInCart.count+=cartCopy[i].count
                else cart.push(cartCopy[i])
            }
        }
        sessionStorage.setItem('cart', JSON.stringify(cart))
        this.setState({cart: cart})
        }
    getCartItems = () => {
            let items = JSON.parse(sessionStorage.getItem('cart'))
        if(items === null) {
            items = this.state.cart
        }
            return items
    }
    setCartOpen = () => {
            if(!this.state.cartOpen) this.setState({cartOpen: true})
        else this.setState({cartOpen: false})
    }
    incrementItem = (cartIndex) => {
            let cartCopy = JSON.parse(sessionStorage.getItem('cart'))
        if(cartCopy === null) {
            cartCopy = JSON.parse(JSON.stringify(this.state.cart))
        }
            let item = cartCopy[cartIndex]
            item.count+=1
            sessionStorage.setItem('cart', JSON.stringify(cartCopy))
            this.setState({cart: cartCopy})
    }
    decrementItem = (cartIndex) => {
        let cartCopy = JSON.parse(sessionStorage.getItem('cart'))
        if(cartCopy === null) {
            cartCopy = JSON.parse(JSON.stringify(this.state.cart))
        }
        let item = cartCopy[cartIndex]
        if(item.count > 1) {
            item.count-=1
            sessionStorage.setItem('cart', JSON.stringify(cartCopy))
            this.setState({cart: cartCopy})
        } else return
    }
    removeItem = (item) => {
        let cartCopy = JSON.parse(sessionStorage.getItem('cart'))
        if(cartCopy === null) {
            cartCopy = JSON.parse(JSON.stringify(this.state.cart))
        }
        let index = cartCopy.findIndex(i => {
            return (JSON.stringify(item) === JSON.stringify(i))
        })
        delete cartCopy[index]
        let cart = cartCopy.flat()
        sessionStorage.setItem('cart', JSON.stringify(cart))
        this.setState({cart: cart})
    }
    getCartQuantity = () => {
            let cartItems = JSON.parse(sessionStorage.getItem('cart'))
        if(cartItems === null) {
            cartItems = this.state.cart
        }
        if(!cartItems.length) return 0
        else return (cartItems.map(item => item.count).reduce((sum, item) =>sum + item))
    }
    getTotalPrice = () => {
            let cart = JSON.parse(sessionStorage.getItem('cart'))
        if(cart === null) {
            cart = this.state.cart
        }
            let sumPriceOfItem = cart.map(product => {
                let quantity = product.count
                return (product.prices.map( price => {
                    let amount = price.amount*quantity
                    return [amount, price.currency]} ))})
            if(!sumPriceOfItem.length) return
            let priceCount = sumPriceOfItem[0].length
            if(!priceCount) return
            else {
                let total =[]
                for(let i = 0; i < priceCount; i++) {
                    let result = sumPriceOfItem.reduce( (sum, item) => sum+item[i][0], 0)
                    total.push({amount: result, currency: sumPriceOfItem[0][i][1]})
                }
                return (total.filter( price => price.currency.label === this.state.selectedCurrency.label))
            }
    }
    checkOut = () => {
            const cart = []
            sessionStorage.setItem('cart', JSON.stringify(cart))
            this.setState({cart: cart})
    }

    render() {
        const{
            categoryList,
            selectedCategory,
            selectedCurrency,
            productId,
            candidateToCart,
            cartOpen} = this.state

        const{
            setCategories,
            showCategory,
            changeCategory,
            setCurrencies,
            changeCurrency,
            getProductId,
            addToCart,
            setCandidateToCart,
            getCandidate,
            changeCandidateAttrValue,
            changeCartItemAttrValue,
            getCartItems,
            setCartOpen,
            incrementItem,
            decrementItem,
            removeItem,
            getCartQuantity,
            getTotalPrice,
            checkOut,
        } = this

    return (
        <StateContext.Provider value={
            {
                categoryList,
                selectedCategory,
                selectedCurrency,
                productId,
                candidateToCart,
                cartOpen,
                setCategories,
                showCategory,
                changeCategory,
                setCurrencies,
                changeCurrency,
                getProductId,
                addToCart,
                setCandidateToCart,
                getCandidate,
                changeCandidateAttrValue,
                changeCartItemAttrValue,
                getCartItems,
                setCartOpen,
                incrementItem,
                decrementItem,
                removeItem,
                getCartQuantity,
                getTotalPrice,
                checkOut
            }}>
            {this.props.children}
        </StateContext.Provider>
    )
    }
}

export default StateContext
export {StateProvider}