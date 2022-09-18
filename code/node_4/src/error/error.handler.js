const handlerError = (dataIsNull, ctx) => {
    ctx.body = dataIsNull;
};

module.exports = handlerError;