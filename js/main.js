(function() {
  var Back, Front, Main;

  Back = (function() {
    var Light, Obj;

    function Back() {
      var i, obj, _i;
      this.canvas = $('#back').get(0);
      this.context = this.canvas.getContext('2d');
      this.width = this.canvas.width = $(window).width();
      this.height = this.canvas.height = $(window).height();
      this.light = new Light(this);
      this.objects = [];
      for (i = _i = 0; _i < 20; i = ++_i) {
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

    Back.prototype.update = function() {
      var obj, _i, _len, _ref, _results;
      this.light.update();
      _ref = this.objects;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        _results.push(obj.update());
      }
      return _results;
    };

    Back.prototype.draw = function() {
      var obj, _i, _len, _ref, _results;
      this.context.clearRect(0, 0, this.width, this.height);
      this.light.draw();
      _ref = this.objects;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        _results.push(obj.draw(this.context));
      }
      return _results;
    };

    Light = (function() {
      function Light(back) {
        this.back = back;
        this.context = this.back.context;
        this.size = Math.sqrt(Math.pow(this.back.height, 2) + Math.pow(this.back.width, 2));
        this.img = new Image();
        this.img.src = 'img/light.jpg';
        this.rotation = 0;
      }

      Light.prototype.update = function() {
        return this.rotation += 0.01;
      };

      Light.prototype.draw = function() {
        this.context.save();
        this.context.translate(this.back.width / 2, this.back.height / 2);
        this.context.rotate(this.rotation);
        this.context.translate(-this.size / 2, -this.size / 2);
        this.context.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.size, this.size);
        return this.context.restore();
      };

      return Light;

    })();

    Obj = (function() {
      function Obj(back) {
        this.back = back;
        this.context = this.back.context;
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
          this.pos.y = this.back.height;
        }
        if (this.pos.x < -this.size.width) {
          this.pos.x = this.back.width + this.size.width;
        }
        if (this.pos.x > this.back.width + this.size.width) {
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

    return Back;

  })();

  Front = (function() {
    var Obj;

    function Front() {
      var i, obj, _i;
      this.canvas = $('#front').get(0);
      this.context = this.canvas.getContext('2d');
      this.width = this.canvas.width = $(window).width();
      this.height = this.canvas.height = $(window).height();
      this.objects = [];
      for (i = _i = 0; _i < 5; i = ++_i) {
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

    Front.prototype.update = function() {
      var obj, _i, _len, _ref, _results;
      _ref = this.objects;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        _results.push(obj.update());
      }
      return _results;
    };

    Front.prototype.draw = function() {
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

    Obj = (function() {
      function Obj(back) {
        this.back = back;
        this.context = this.back.context;
        this.direction = Math.random() > 0.5 ? 1 : -1;
        this.size = {
          width: 160,
          height: 160
        };
        this.pos = {
          x: Math.random() * $(window).width(),
          y: (0.5 + Math.random()) * $(window).height()
        };
        this.vel = {
          x: -10 * this.direction,
          y: -3
        };
        this.img = new Image();
        this.img.src = 'img/taka.png';
        this.rotation = Math.PI * 2 * Math.random();
      }

      Obj.prototype.update = function() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        if (this.pos.y < -this.size.height) {
          this.pos.y = this.back.height;
        }
        if (this.pos.x < -this.size.width) {
          this.pos.x = this.back.width + this.size.width;
        }
        if (this.pos.x > this.back.width + this.size.width) {
          this.pos.x = -this.size.width;
        }
        return this.rotation += Math.PI * 0.05;
      };

      Obj.prototype.draw = function() {
        this.context.save();
        this.context.translate(this.pos.x, this.pos.y);
        this.context.scale(this.direction, 1);
        this.context.translate(-this.size.width / 2, -this.size.height / 2);
        this.context.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.size.width, this.size.height);
        return this.context.restore();
      };

      return Obj;

    })();

    return Front;

  })();

  Main = (function() {
    function Main() {
      new Back();
      new Front();
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
