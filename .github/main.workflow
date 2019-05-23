workflow "Test" {
  on = "push"
  resolves = ["Composer Install"]
}



action "Install" {
  uses = "nuxt/actions-yarn@master"
  args = "install"
}

action "Test JS" {
  needs = "Install"
  uses = "nuxt/actions-yarn@master"
  args = "test:ci"
}

action "Composer Install" {
  needs = "Test JS"
  uses = "MilesChou/composer-action@master"
  args = "install"
}

