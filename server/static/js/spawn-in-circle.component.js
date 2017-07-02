AFRAME.registerComponent('spawn-in-circle', {
  schema: {
    radius: {type: 'number', default: 1}
  },

/**/

init: function () {

        if( AFRAME.utils.device.isMobile() ){

          var el = this.el;
          var center = el.getAttribute('position');

          var angleRad = this.getRandomAngleInRadians();
          var circlePoint = this.randomPointOnCircle(this.data.radius, angleRad);
          var worldPoint = {x: circlePoint.x + center.x, y: center.y, z: circlePoint.y + center.z};
          el.setAttribute('position', worldPoint);

          var angleDeg = angleRad * 180 / Math.PI;
          var angleToCenter = -1 * angleDeg + 90;
          var rotationStr = '0 ' + angleToCenter + ' 0';
          el.setAttribute('rotation', rotationStr);

          /* Add mobile controls */
          var scene = document.querySelector('a-scene');
          var entityEl = document.createElement('a-entity');

           entityEl.setAttribute('universal-controls', {
              movementControls: 'checkpoint',
            });

            entityEl.setAttribute('checkpoint-controls', {
              mode: 'animate',
            });

          entityEl.setAttribute('position', worldPoint);
          entityEl.setAttribute('camera','camera');

          /* *** */
            var innerEl = document.createElement('a-entity');
            innerEl.setAttribute('cursor', {maxDistance: 30});
            innerEl.setAttribute('position', {x:0, y: 0, z: -1});

            innerEl.setAttribute('geometry', {
                primitive: 'ring',
                radiusInner: 0.01,
                radiusOuter: 0.015
            });

            innerEl.setAttribute('material', {
                color: '#CCC',
                shader: 'flat'
            }); 

            entityEl.appendChild(innerEl);

            scene.appendChild(entityEl);           

            
        } else {
          var el = this.el;
          var center = el.getAttribute('position');

          var angleRad = this.getRandomAngleInRadians();
          var circlePoint = this.randomPointOnCircle(this.data.radius, angleRad);
          var worldPoint = {x: circlePoint.x + center.x, y: center.y, z: circlePoint.y + center.z};
          el.setAttribute('position', worldPoint);

          var angleDeg = angleRad * 180 / Math.PI;
          var angleToCenter = -1 * angleDeg + 90;
          var rotationStr = '0 ' + angleToCenter + ' 0';
          el.setAttribute('rotation', rotationStr);
        }

    },

  getRandomAngleInRadians: function() {
    return Math.random()*Math.PI*2;
  },

  randomPointOnCircle: function (radius, angleRad) {
    x = Math.cos(angleRad)*radius;
    y = Math.sin(angleRad)*radius;
    return {x: x, y: y};
  }


/*update: function(){

    },

    tick: function(){



    },

    remove: function(){

    }*/

});