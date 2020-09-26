export default storage => ({
    get(key){
        try{
            return JSON.parse(storage.getItem(key))
        }
        catch(e){
            return null;
        }
    },
    set(key, val){
        storage.setItem(key, JSON.stringify(val));
    },
    remove(key){
        storage.removeItem(key);
    }
});

