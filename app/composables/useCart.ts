import type { CartItem, Program } from '~/types'

export const useCart = () => {
  // Use Pinia store for persistent cart state
  const cartItems = ref<CartItem[]>([])
  const isLoading = ref(false)

  // Load cart from localStorage on initialization
  const loadCart = () => {
    if (import.meta.client) {
      const savedCart = localStorage.getItem('kettlebell-pro-cart')
      if (savedCart) {
        try {
          cartItems.value = JSON.parse(savedCart)
        }
        catch (error) {
          console.error('Error loading cart from localStorage:', error)
          cartItems.value = []
        }
      }
    }
  }

  // Save cart to localStorage
  const saveCart = () => {
    if (import.meta.client) {
      localStorage.setItem('kettlebell-pro-cart', JSON.stringify(cartItems.value))
    }
  }

  // Add item to cart
  const addToCart = (program: Program, quantity = 1) => {
    const existingItem = cartItems.value.find(item => item.programId === program.id)

    if (existingItem) {
      existingItem.quantity += quantity
    }
    else {
      cartItems.value.push({
        programId: program.id,
        program,
        quantity,
      })
    }

    saveCart()
  }

  // Remove item from cart
  const removeFromCart = (programId: string) => {
    const index = cartItems.value.findIndex(item => item.programId === programId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
      saveCart()
    }
  }

  // Update item quantity
  const updateQuantity = (programId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(programId)
      return
    }

    const item = cartItems.value.find(item => item.programId === programId)
    if (item) {
      item.quantity = quantity
      saveCart()
    }
  }

  // Clear entire cart
  const clearCart = () => {
    cartItems.value = []
    saveCart()
  }

  // Check if item is in cart
  const isInCart = (programId: string) => {
    return cartItems.value.some(item => item.programId === programId)
  }

  // Get item quantity
  const getItemQuantity = (programId: string) => {
    const item = cartItems.value.find(item => item.programId === programId)
    return item?.quantity || 0
  }

  // Calculate item total (price * quantity)
  const getItemTotal = (item: CartItem) => {
    const price = item.program.salePrice || item.program.price
    return price * item.quantity
  }

  // Calculate cart subtotal
  const getSubtotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + getItemTotal(item)
    }, 0)
  })

  // Calculate tax (8% for example)
  const getTax = computed(() => {
    return getSubtotal.value * 0.08
  })

  // Calculate shipping (free over $50, otherwise $5)
  const getShipping = computed(() => {
    return getSubtotal.value >= 50 ? 0 : 5
  })

  // Calculate total
  const getTotal = computed(() => {
    return getSubtotal.value + getTax.value + getShipping.value
  })

  // Get cart item count
  const getItemCount = computed(() => {
    return cartItems.value.reduce((count, item) => count + item.quantity, 0)
  })

  // Get unique item count
  const getUniqueItemCount = computed(() => {
    return cartItems.value.length
  })

  // Check if cart is empty
  const isEmpty = computed(() => {
    return cartItems.value.length === 0
  })

  // Get cart summary for checkout
  const getCartSummary = () => {
    return {
      items: cartItems.value,
      subtotal: getSubtotal.value,
      tax: getTax.value,
      shipping: getShipping.value,
      total: getTotal.value,
      itemCount: getItemCount.value,
    }
  }

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  // Calculate savings from sale prices
  const getTotalSavings = computed(() => {
    return cartItems.value.reduce((savings, item) => {
      if (item.program.salePrice && item.program.salePrice < item.program.price) {
        const itemSavings = (item.program.price - item.program.salePrice) * item.quantity
        return savings + itemSavings
      }
      return savings
    }, 0)
  })

  // Validate cart before checkout
  const validateCart = () => {
    const errors: string[] = []

    if (isEmpty.value) {
      errors.push('Cart is empty')
    }

    // Check for any invalid items
    cartItems.value.forEach((item) => {
      if (!item.program || !item.program.id) {
        errors.push('Invalid item in cart')
      }
      if (item.quantity <= 0) {
        errors.push('Invalid quantity for item')
      }
    })

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  // Prepare checkout data
  const prepareCheckout = () => {
    const validation = validateCart()
    if (!validation.isValid) {
      throw new Error(`Cart validation failed: ${validation.errors.join(', ')}`)
    }

    return {
      items: cartItems.value.map(item => ({
        programId: item.programId,
        title: item.program.title,
        price: item.program.salePrice || item.program.price,
        quantity: item.quantity,
        total: getItemTotal(item),
      })),
      summary: getCartSummary(),
    }
  }

  // Initialize cart on composable creation
  onMounted(() => {
    loadCart()
  })

  return {
    cartItems: readonly(cartItems),
    isLoading: readonly(isLoading),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    getItemTotal,
    getSubtotal,
    getTax,
    getShipping,
    getTotal,
    getItemCount,
    getUniqueItemCount,
    isEmpty,
    getCartSummary,
    formatPrice,
    getTotalSavings,
    validateCart,
    prepareCheckout,
    loadCart,
  }
}
