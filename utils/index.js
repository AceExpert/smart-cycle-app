function resolveBtAddress(address) {
    return address.map(v => v >= 0? v.toString(16) : (256 + v).toString(16)).join(":");
};

export {resolveBtAddress}