///Removes entities that go out of the defined bounds
AFRAME.registerSystem('boundary-checker', {
    schema:{
        boundsX:{type:'vec2', default:'-50, 50'},
        boundsY:{type:'vec2', default:'-20 20'},
        boundsZ:{type:'vec2', default:'-50 50'}
    },
    init: function(){
        this.entities = [];
    },
    registerMe: function(el){
        this.entities.push(el);
    },
    unRegisterMe: function(el){
        let i = this.entities.indexOf(el);
        this.entities.splice(i, 1);
    },
    tick: function(){
        this.entities.forEach((e)=>{
            let pos = e.components['position'].attrValue;
            if(!isBetween(pos.x, this.data.boundsX.x, this.data.boundsX.y) ||
            !isBetween(pos.y, this.data.boundsY.x, this.data.boundsY.y) ||
            !isBetween(pos.z, this.data.boundsZ.x, this.data.boundsZ.y)){
                this.unRegisterMe(e);
                document.querySelector('a-scene').removeChild(e);
                //console.log('entity removed: ' + e);
            }
        });
    }
});

let isBetween = (value, min, max) => {
    return (value > min && value < max);
};