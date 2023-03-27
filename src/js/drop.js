export const watchListener = function (val, fun) {
  if (val)
    document.addEventListener("click", fun, {
      capture: true,
    });
  else
    document.removeEventListener("click", fun, {
      capture: true,
    });
};

export const closeDrop = function (e, callback, arg1, arg2) {
  const node = document.getElementById(arg1);
  const node2 = document.getElementById(arg2);
  if (!node || !node2) return callback(false);
  if (node.contains(e.target) || node2.contains(e.target)) return;
  else return callback(false);
};
