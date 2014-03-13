checky-js
=========

jQuery/CSS plugin for facilitating a dropdown container for checkbox items


HTML Markup:
```html
<!-- jQuery is required -->
<script src="jquery.js"></script>
<!-- Checky file includes -->
<script src="checky.js"></script>
<link rel="stylesheet" type="text/css" href="checky.css">

<!-- Initialize checky -->
<script>
  $('.checky').checky();
</script>

<!-- Our dropdown list -->
<div class="checky">
	<span class="checky-label">Select some stuff</span>
	<div class="checky-options">
		<label><input type="checkbox" id="chk0" name="chk[]">Yo</label>
		<label><input type="checkbox" id="chk1" name="chk[]">Dude</label>
		<label><input type="checkbox" id="chk2" name="chk[]">Mon</label>
	</div>
</div>
```
