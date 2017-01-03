class Moveup
  class Obj
    constructor: (parent) ->
      @parent = parent
      @context = @parent.context
      @size =
        width: 80
        height: 80
      @pos =
        x: Math.random() * $(window).width()
        y: (0.5 + Math.random()) * $(window).height()
      @vel =
        x: (Math.random() - 0.5) * 2
        y: -3

      @img = new Image()
      @img.src = 'img/nasu.png'
      @rotation = Math.PI * 2 * Math.random()

    update: ->
      @pos.x += @vel.x
      @pos.y += @vel.y
      if @pos.y < -@size.height
        @pos.y = @parent.height
      if @pos.x < -@size.width
        @pos.x = @parent.width + @size.width
      if @pos.x > @parent.width + @size.width
        @pos.x = -@size.width
      # @vel.y -= 0.1
      @rotation += Math.PI * 0.05
    draw: ->
      @context.save()
      @context.translate(@pos.x, @pos.y)
      @context.rotate(@rotation)
      @context.translate(-@size.width/2, -@size.height/2)


      @context.drawImage(
        @img, 0, 0, @img.width, @img.height,
        0, 0 , @size.width, @size.height)

      @context.restore()

  constructor: ->
    @canvas = $('#moveup').get(0)
    @context = @canvas.getContext('2d')
    @width = @canvas.width = $(window).width()
    @height = @canvas.height = $(window).height()

    @objects = []
    for i in [0...10]
      obj = new Obj(@)

      @objects.push obj

    @timer = setInterval =>
      @update()
      @draw()
    , 33

  update: ->
    for obj in @objects
      obj.update()

  draw: ->
    @context.clearRect(0, 0, @width, @height)
    # @context.beginPath()
    # @context.fillRect(0, 0, @width, @height)
    # @context.fillRect(10, 10, 40, 40)
    for obj in @objects
      obj.draw @context



class Main
  constructor: ->
    new Moveup()
    $('body').css 'height', $(window).height()
    @initLight()
    # @initObjects()
    @counter = 0
    @timer = setInterval =>
      @update()
    , 33

  initLight: ->
    height = $(window).height()
    width = $(window).width()
    size = Math.sqrt(height * height + width * width)
    $('#light').css 'width', size
    $('#light').css 'height', size
    $('#light').css 'margin-left', (width - size)/2
    $('#light').css 'margin-top', (height - size)/2

  initObjects: ->
    @objects = []
    for i in [0...10]
      obj = $('.object').clone()
      obj.pos =
        x: Math.random() * $(window).width()
        # y: (1 + Math.random()) * $(window).height()
        y: 10

      obj.vel =
        x: 0
        y: -1

      obj.css 'margin-left', obj.pos.x
      obj.css 'margin-top', obj.pos.y
      $('#objects').append obj
      @objects.push obj

  update: ->
    # $('#light').css 'transform', "rotate(#{@counter}deg)"

    # for obj in @objects
    #   obj.pos.x += obj.vel.x
    #   obj.pos.y += obj.vel.y

    #   obj.css 'margin-left', obj.pos.x
    #   obj.css 'margin-top', obj.pos.y

    @counter++


$ ->
  new Main
