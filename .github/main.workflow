workflow "Test" {
  on = "push"
  resolves = ["Test"]
}

action "Install" {
  uses = "nuxt/actions-yarn@master"
  args = "install"
}

action "Test" {
  needs = "Install"
  uses = "nuxt/actions-yarn@master"
  args = "test:ci"
}

