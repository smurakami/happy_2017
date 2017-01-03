(function() {
  var Main, Moveup;

  Moveup = (function() {
    var Obj;

    Obj = (function() {
      function Obj(parent) {
        this.parent = parent;
        this.context = this.parent.context;
        this.size = {
          width: 80,
          height: 80
        };
        this.pos = {
          x: Math.random() * $(window).width(),
          y: (0.5 + Math.random()) * $(window).height()
        };
        this.vel = {
          x: (Math.random() - 0.5) * 2,
          y: -3
        };
        this.img = new Image();
        this.img.src = 'img/nasu.png';
        this.rotation = Math.PI * 2 * Math.random();
      }

      Obj.prototype.update = function() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        if (this.pos.y < -this.size.height) {
          this.pos.y = this.parent.height;
        }
        if (this.pos.x < -this.size.width) {
          this.pos.x = this.parent.width + this.size.width;
        }
        if (this.pos.x > this.parent.width + this.size.width) {
          this.pos.x = -this.size.width;
        }
        return this.rotation += Math.PI * 0.05;
      };

      Obj.prototype.draw = function() {
        this.context.save();
        this.context.translate(this.pos.x, this.pos.y);
        this.context.rotate(this.rotation);
        this.context.translate(-this.size.width / 2, -this.size.height / 2);
        this.context.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.size.width, this.size.height);
        return this.context.restore();
      };

      return Obj;

    })();

    function Moveup() {
      var i, obj, _i;
      this.canvas = $('#moveup').get(0);
      this.context = this.canvas.getContext('2d');
      this.width = this.canvas.width = $(window).width();
      this.height = this.canvas.height = $(window).height();
      this.objects = [];
      for (i = _i = 0; _i < 10; i = ++_i) {
        obj = new Obj(this);
        this.objects.push(obj);
      }
      this.timer = setInterval((function(_this) {
        return function() {
          _this.update();
          return _this.draw();
        };
      })(this), 33);
    }

    Moveup.prototype.update = function() {
      var obj, _i, _len, _ref, _results;
      _ref = this.objects;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        _results.push(obj.update());
      }
      return _results;
    };

    Moveup.prototype.draw = function() {
      var obj, _i, _len, _ref, _results;
      this.context.clearRect(0, 0, this.width, this.height);
      _ref = this.objects;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        _results.push(obj.draw(this.context));
      }
      return _results;
    };

    return Moveup;

  })();

  Main = (function() {
    function Main() {
      new Moveup();
      $('body').css('height', $(window).height());
      this.initLight();
      this.counter = 0;
      this.timer = setInterval((function(_this) {
        return function() {
          return _this.update();
        };
      })(this), 33);
    }

    Main.prototype.initLight = function() {
      var height, size, width;
      height = $(window).height();
      width = $(window).width();
      size = Math.sqrt(height * height + width * width);
      $('#light').css('width', size);
      $('#light').css('height', size);
      $('#light').css('margin-left', (width - size) / 2);
      return $('#light').css('margin-top', (height - size) / 2);
    };

    Main.prototype.initObjects = function() {
      var i, obj, _i, _results;
      this.objects = [];
      _results = [];
      for (i = _i = 0; _i < 10; i = ++_i) {
        obj = $('.object').clone();
        obj.pos = {
          x: Math.random() * $(window).width(),
          y: 10
        };
        obj.vel = {
          x: 0,
          y: -1
        };
        obj.css('margin-left', obj.pos.x);
        obj.css('margin-top', obj.pos.y);
        $('#objects').append(obj);
        _results.push(this.objects.push(obj));
      }
      return _results;
    };

    Main.prototype.update = function() {
      return this.counter++;
    };

    return Main;

  })();

  $(function() {
    return new Main;
  });

}).call(this);

//# sourceMappingURL=main.js.map
