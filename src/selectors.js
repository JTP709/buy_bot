const BEST_BUY = {
    CLASS: {
        ADD_TO_CART_BUTTON: 'add-to-cart-button',
        ADDED_TO_CART_MODAL: 'added-to-cart',
        CHECKOUT_BUTTON: 'btn btn-lg btn-block btn-primary',
        SIGN_IN_PAGE_HEADER: 'cia-section-title c-section-title heading-5 v-fw-regular',
    },
    NAME: {
        EMAIL_INPUT: 'fld-e',
        PASSWORD_INUPT: 'fld-p1',
    },
    ID: {
        SECURITY_CODE_INPUT: 'credit-card-cvv',
    },
    CSS: {
        PLACE_YOUR_ORDER: "button[data-track='Place your Order - Contact Card']",
    }
};

const WALMART = {
    CSS: {
        ADD_TO_CART_BUTTON: 'button[data-tl-id="ProductPrimaryCTA-cta_add_to_cart_button"]',
        CHECKOUT_BUTTON: 'button[data-tl-id="IPPacCheckOutBtnBottom"]',
        FULFILLMENT_CONTINUE_BUTTON: 'button[data-automation-id="fulfillment-continue"]',
        ADDRESS_CONTINUE_BUTTON: 'button[data-automation-id="address-book-action-buttons-on-continue"]',
        REVIEW_ORDER_BUTTON: 'button[data-automation-id="submit-payment-cc"]',
        PLACE_ORDER_BUTTON: 'button[data-automation-id="summary-place-holder"]',
    },
    NAME: {
        EMAIL_INPUT_NAME: 'email',
        PASSWORD_INPUT_NAME: 'password',
        SECURITY_CODE_INPUT_ID: 'cvv',
    },
};

const GAMESTOP = {
};

module.exports = {
    BEST_BUY,
    WALMART,
    GAMESTOP
};