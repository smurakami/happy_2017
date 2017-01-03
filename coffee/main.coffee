class Back
  constructor: ->
    @canvas = $('#back').get(0)
    @context = @canvas.getContext('2d')
    @width = @canvas.width = $('#container').width()
    @height = @canvas.height = $('#container').height()

    @light = new Light(@)
    @objects = []

    @timer = setInterval =>
      @update()
      @draw()
    , 33

  initNasu: ->
    for i in [0...10]
      obj = new Obj(@)
      @objects.push obj

  update: ->
    @light.update()
    for obj in @objects
      obj.update()

  draw: ->
    @context.clearRect(0, 0, @width, @height)
    # @context.beginPath()
    # @context.fillRect(0, 0, @width, @height)
    # @context.fillRect(10, 10, 40, 40)
    @light.draw()
    for obj in @objects
      obj.draw @context


  class Light
    constructor: (back) ->
      @back = back
      @context = @back.context
      @size = Math.sqrt( Math.pow(@back.height, 2) + Math.pow(@back.width, 2)  )
      @img = new Image()
      @img.src = 'img/light.jpg'
      @rotation = 0
    update: ->
      @rotation += 0.01
    draw: ->
      @context.save()
      @context.translate(@back.width/2, @back.height/2)
      @context.rotate(@rotation)
      @context.translate(-@size/2, -@size/2)
      @context.drawImage(
        @img, 0, 0, @img.width, @img.height,
        0, 0 , @size, @size)
      @context.restore()


  class Obj
    constructor: (back) ->
      @back = back
      @context = @back.context
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
        @pos.y = @back.height
      if @pos.x < -@size.width
        @pos.x = @back.width + @size.width
      if @pos.x > @back.width + @size.width
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

class Front
  constructor: ->
    @canvas = $('#front').get(0)
    @context = @canvas.getContext('2d')
    @width = @canvas.width = $('#container').width()
    @height = @canvas.height = $('#container').height()

    @objects = []
    for i in [0...5]
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
    for obj in @objects
      obj.draw @context


  class Obj
    constructor: (back) ->
      @back = back
      @context = @back.context
      @direction = if Math.random() > 0.5 then 1 else -1
      @size =
        width: 160
        height: 160
      @pos =
        x: Math.random() * $(window).width()
        y: (0.5 + Math.random()) * $(window).height()
      @vel =
        x: -10 * @direction
        y: -3

      @img = new Image()
      @img.src = 'img/taka.png'
      @rotation = Math.PI * 2 * Math.random()

    update: ->
      @pos.x += @vel.x
      @pos.y += @vel.y
      if @pos.y < -@size.height
        @pos.y = @back.height
      if @pos.x < -@size.width
        @pos.x = @back.width + @size.width
      if @pos.x > @back.width + @size.width
        @pos.x = -@size.width
      # @vel.y -= 0.1
      @rotation += Math.PI * 0.05
    draw: ->
      @context.save()
      @context.translate(@pos.x, @pos.y)
      @context.scale(@direction, 1)
      @context.translate(-@size.width/2, -@size.height/2)


      @context.drawImage(
        @img, 0, 0, @img.width, @img.height,
        0, 0 , @size.width, @size.height)

      @context.restore()


class Murakami
  constructor: ->
    $('#murakami').animate
      top: '50%'
    , 10, null, =>
      $('#murakami').css 'display', 'block'
      @up()
    counter = 0
    round = 20
  up: ->
    $('#murakami').animate
      top: '5%'
    , 5000, null, =>
      @stay()
  stay: ->
    $('#kotoyoro').css 'display', 'block'
    setTimeout =>
      $('#kotoyoro').css 'display', 'none'
      @down()
    , 3000
  down: ->
    $('#murakami').animate
      top: '50%'
    , 5000, null, =>
      @up()


class Main
  constructor: ->
    $('body').css 'height', $(window).height()
    $('#container').css(
      'margin-left',
      ($(window).width() - $('#container').width())/2)
    back = new Back()

    $('#container').animate
      opacity: 1
    , 4000, null, null

    back.initNasu()
    new Front()

    setTimeout =>
      new Murakami()
    , 5000

    @counter = 0


$ ->
  new Main
