function getTitle(vm) {
    const {title} = vm.$options;
    if (title) {
        return typeof title === 'function'
            ? title.call(vm)
            : title
    }
}

export default {
    created() {
        const mixinTitle = getTitle(this);

        if (mixinTitle) {
            document.title = mixinTitle
        }
    }
}