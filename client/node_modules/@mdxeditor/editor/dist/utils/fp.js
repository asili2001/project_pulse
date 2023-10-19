function tap(arg, proc) {
  proc(arg);
  return arg;
}
function always(value) {
  return () => value;
}
function noop() {
}
export {
  always,
  noop,
  tap
};
