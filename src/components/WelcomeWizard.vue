<template>
	<div class="wizard">
		<h1>Welcome to the Crew!</h1>
		<div class="card">
			<form @submit.prevent class="form">
        <div class="form__group">
          <div class="form__radio-group">
            <input required type="radio" class="form__radio-input" id="learn" name="type" />
            <label for="learn" class="form__radio-label">I'm a parent or student</label>
          </div>
          <div class="form__radio-group">
            <input required type="radio" class="form__radio-input" id="teach" name="type" />
            <label for="teach" class="form__radio-label">I want to tutor</label>
          </div>
        </div>
      </form>
		</div>
	</div>
</template>