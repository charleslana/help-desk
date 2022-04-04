<template>
  <footer class="footer">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <b-tooltip label="Acesse o github" position="is-right" type="is-dark">
            <a href="https://github.com/charleslana" target="_blank">
              <b-icon icon="github" size="is-medium" type="is-dark"></b-icon>
            </a>
          </b-tooltip>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <p>© {{ getYear() }} Help4 Business. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    getYear() {
      const date = new Date();
      return date.getFullYear();
    }
  }
}
</script>

<style>
.footer {
  background-color: #cec2b4 !important;
  padding: 1.5rem !important;
  color: #0a0a0a !important;
}
</style>
