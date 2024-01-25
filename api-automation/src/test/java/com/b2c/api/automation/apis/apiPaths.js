function () {
    const version = "/api/v1";
    const auth = "/auth" + version;
    const bff = "/bff" + version;
    const kyc = "/kyc" + version;
    const payment = "/payment" + version;
    const checkout = "/checkout" + version;
    const referral = "/referral" + version;
    const user = "/user" + version;
    const wishlist = "/wishlist" + version;

    return {
             "signup": auth + "/signup",
             "login" : auth + "/login",
             "otpLogin" : auth + "/otp-login",
             "logout" : auth + "/logout",
             "renewToken" : auth + "/renew-token",
// bff service
             "home" : bff + "/home",
             "search" : bff + "/search",
             "userDetails" : bff + "/user-details",
             "bondPdf" : bff + "/bond-pdf",
             "bondDetails" : bff + "/listings/@@id@@/details",
             "bondsListings" : bff + "/bond-listing",
             "bondFilters" : bff + "/bond-listing/filters-availability",

// referral service
    //referral controller
             "generateReferral" : referral + "/referral/generate",
             "createReferral" : referral + "/referral/create",
             "validateReferral" : referral + "/referral/validate",
             "getCodeReferral" : referral + "/referral/get-code",
    //referral code controller
             "generateReferralCodes" : referral + "/referral-codes/generate",
             "validateReferralCodes" : referral + "/referral-codes/validate",
// user service
    // user controller
             "changeUserName" : user + "/@@platform-name@@/users/username",
             "blockUser" : user + "/@@platform-name@@/users/block",
             "createUser" : user + "/@@platform-name@@/users",
             "getUpdateUser" : user + "/@@platform-name@@/users/@@user-id@@",
             "updateUserFields" : user + "/@@platform-name@@/users/@@user-id@@/user-details",
             "getUpdateUserPicture" : user + "/@@platform-name@@/users/@@user-id@@/profile",
             "updateUserEmail" : user + "/@@platform-name@@/users/@@user-id@@/email",
             "validateUser" : user + "/@@platform-name@@/users/validate",
             "getUserIdentity" : user + "/@@platform-name@@/users/identity",
    // user preference controller
             "getUpdateUserPreferences" : user + "/@@platform-name@@/preferences",
// wishlist service
    //wishlist controller
             "getWishlistItems": wishlist + "/wishlists/get-item",
             "addWishlistItems": wishlist + "/wishlists/add-item",
             "removeWishlistItems": wishlist + "/wishlists/remove-item"
        }
}