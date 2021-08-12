/*!
 * Engine.IO v5.1.2
 * (c) 2014-2021 Guillermo Rauch
 * Released under the MIT License.
 */
!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.eio = e())
    : (t.eio = e());
})(self, function () {
  return (function (t) {
    var e = {};
    function r(n) {
      if (e[n]) return e[n].exports;
      var o = (e[n] = { i: n, l: !1, exports: {} });
      return t[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
    }
    return (
      (r.m = t),
      (r.c = e),
      (r.d = function (t, e, n) {
        r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
      }),
      (r.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (r.t = function (t, e) {
        if ((1 & e && (t = r(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (
          (r.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var o in t)
            r.d(
              n,
              o,
              function (e) {
                return t[e];
              }.bind(null, o)
            );
        return n;
      }),
      (r.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return r.d(e, "a", e), e;
      }),
      (r.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (r.p = ""),
      r((r.s = 11))
    );
  })([
    function (t, e, r) {
      var n = r(15),
        o = r(16),
        i = String.fromCharCode(30);
      t.exports = {
        protocol: 4,
        encodePacket: n,
        encodePayload: function (t, e) {
          var r = t.length,
            o = new Array(r),
            s = 0;
          t.forEach(function (t, a) {
            n(t, !1, function (t) {
              (o[a] = t), ++s === r && e(o.join(i));
            });
          });
        },
        decodePacket: o,
        decodePayload: function (t, e) {
          for (var r = t.split(i), n = [], s = 0; s < r.length; s++) {
            var a = o(r[s], e);
            if ((n.push(a), "error" === a.type)) break;
          }
          return n;
        },
      };
    },
    function (t, e) {
      t.exports =
        "undefined" != typeof self
          ? self
          : "undefined" != typeof window
          ? window
          : Function("return this")();
    },
    function (t, e, r) {
      function n(t) {
        return (n =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function o(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function i(t, e) {
        return (i =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function s(t) {
        var e = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var r,
            n = u(t);
          if (e) {
            var o = u(this).constructor;
            r = Reflect.construct(n, arguments, o);
          } else r = n.apply(this, arguments);
          return a(this, r);
        };
      }
      function a(t, e) {
        return !e || ("object" !== n(e) && "function" != typeof e)
          ? (function (t) {
              if (void 0 === t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return t;
            })(t)
          : e;
      }
      function u(t) {
        return (u = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      var c = r(0),
        f = (function (t) {
          !(function (t, e) {
            if ("function" != typeof e && null !== e)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              e && i(t, e);
          })(u, t);
          var e,
            r,
            n,
            a = s(u);
          function u(t) {
            var e;
            return (
              (function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, u),
              ((e = a.call(this)).opts = t),
              (e.query = t.query),
              (e.readyState = ""),
              (e.socket = t.socket),
              e
            );
          }
          return (
            (e = u),
            (r = [
              {
                key: "onError",
                value: function (t, e) {
                  var r = new Error(t);
                  return (
                    (r.type = "TransportError"),
                    (r.description = e),
                    this.emit("error", r),
                    this
                  );
                },
              },
              {
                key: "open",
                value: function () {
                  return (
                    ("closed" !== this.readyState && "" !== this.readyState) ||
                      ((this.readyState = "opening"), this.doOpen()),
                    this
                  );
                },
              },
              {
                key: "close",
                value: function () {
                  return (
                    ("opening" !== this.readyState &&
                      "open" !== this.readyState) ||
                      (this.doClose(), this.onClose()),
                    this
                  );
                },
              },
              {
                key: "send",
                value: function (t) {
                  "open" === this.readyState && this.write(t);
                },
              },
              {
                key: "onOpen",
                value: function () {
                  (this.readyState = "open"),
                    (this.writable = !0),
                    this.emit("open");
                },
              },
              {
                key: "onData",
                value: function (t) {
                  var e = c.decodePacket(t, this.socket.binaryType);
                  this.onPacket(e);
                },
              },
              {
                key: "onPacket",
                value: function (t) {
                  this.emit("packet", t);
                },
              },
              {
                key: "onClose",
                value: function () {
                  (this.readyState = "closed"), this.emit("close");
                },
              },
            ]) && o(e.prototype, r),
            n && o(e, n),
            u
          );
        })(r(3));
      t.exports = f;
    },
    function (t, e, r) {
      function n(t) {
        if (t)
          return (function (t) {
            for (var e in n.prototype) t[e] = n.prototype[e];
            return t;
          })(t);
      }
      (t.exports = n),
        (n.prototype.on = n.prototype.addEventListener = function (t, e) {
          return (
            (this._callbacks = this._callbacks || {}),
            (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e),
            this
          );
        }),
        (n.prototype.once = function (t, e) {
          function r() {
            this.off(t, r), e.apply(this, arguments);
          }
          return (r.fn = e), this.on(t, r), this;
        }),
        (n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function (
          t,
          e
        ) {
          if (
            ((this._callbacks = this._callbacks || {}), 0 == arguments.length)
          )
            return (this._callbacks = {}), this;
          var r,
            n = this._callbacks["$" + t];
          if (!n) return this;
          if (1 == arguments.length)
            return delete this._callbacks["$" + t], this;
          for (var o = 0; o < n.length; o++)
            if ((r = n[o]) === e || r.fn === e) {
              n.splice(o, 1);
              break;
            }
          return 0 === n.length && delete this._callbacks["$" + t], this;
        }),
        (n.prototype.emit = function (t) {
          this._callbacks = this._callbacks || {};
          for (
            var e = new Array(arguments.length - 1),
              r = this._callbacks["$" + t],
              n = 1;
            n < arguments.length;
            n++
          )
            e[n - 1] = arguments[n];
          if (r) {
            n = 0;
            for (var o = (r = r.slice(0)).length; n < o; ++n)
              r[n].apply(this, e);
          }
          return this;
        }),
        (n.prototype.listeners = function (t) {
          return (
            (this._callbacks = this._callbacks || {}),
            this._callbacks["$" + t] || []
          );
        }),
        (n.prototype.hasListeners = function (t) {
          return !!this.listeners(t).length;
        });
    },
    function (t, e) {
      (e.encode = function (t) {
        var e = "";
        for (var r in t)
          t.hasOwnProperty(r) &&
            (e.length && (e += "&"),
            (e += encodeURIComponent(r) + "=" + encodeURIComponent(t[r])));
        return e;
      }),
        (e.decode = function (t) {
          for (var e = {}, r = t.split("&"), n = 0, o = r.length; n < o; n++) {
            var i = r[n].split("=");
            e[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
          }
          return e;
        });
    },
    function (t, e, r) {
      var n = r(6),
        o = r(14),
        i = r(18),
        s = r(19);
      (e.polling = function (t) {
        var e = !1,
          r = !1,
          s = !1 !== t.jsonp;
        if ("undefined" != typeof location) {
          var a = "https:" === location.protocol,
            u = location.port;
          u || (u = a ? 443 : 80),
            (e = t.hostname !== location.hostname || u !== t.port),
            (r = t.secure !== a);
        }
        if (
          ((t.xdomain = e),
          (t.xscheme = r),
          "open" in new n(t) && !t.forceJSONP)
        )
          return new o(t);
        if (!s) throw new Error("JSONP disabled");
        return new i(t);
      }),
        (e.websocket = s);
    },
    function (t, e, r) {
      var n = r(13),
        o = r(1);
      t.exports = function (t) {
        var e = t.xdomain,
          r = t.xscheme,
          i = t.enablesXDR;
        try {
          if ("undefined" != typeof XMLHttpRequest && (!e || n))
            return new XMLHttpRequest();
        } catch (t) {}
        try {
          if ("undefined" != typeof XDomainRequest && !r && i)
            return new XDomainRequest();
        } catch (t) {}
        if (!e)
          try {
            return new o[["Active"].concat("Object").join("X")](
              "Microsoft.XMLHTTP"
            );
          } catch (t) {}
      };
    },
    function (t, e, r) {
      function n(t) {
        return (n =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function o(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      function i(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function s(t, e) {
        return (s =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function a(t) {
        var e = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var r,
            n = c(t);
          if (e) {
            var o = c(this).constructor;
            r = Reflect.construct(n, arguments, o);
          } else r = n.apply(this, arguments);
          return u(this, r);
        };
      }
      function u(t, e) {
        return !e || ("object" !== n(e) && "function" != typeof e)
          ? (function (t) {
              if (void 0 === t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return t;
            })(t)
          : e;
      }
      function c(t) {
        return (c = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      var f = r(2),
        p = r(4),
        l = r(0),
        h = r(9),
        y = (function (t) {
          !(function (t, e) {
            if ("function" != typeof e && null !== e)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              e && s(t, e);
          })(c, t);
          var e,
            r,
            n,
            u = a(c);
          function c() {
            return o(this, c), u.apply(this, arguments);
          }
          return (
            (e = c),
            (r = [
              {
                key: "doOpen",
                value: function () {
                  this.poll();
                },
              },
              {
                key: "pause",
                value: function (t) {
                  var e = this;
                  this.readyState = "pausing";
                  var r = function () {
                    (e.readyState = "paused"), t();
                  };
                  if (this.polling || !this.writable) {
                    var n = 0;
                    this.polling &&
                      (n++,
                      this.once("pollComplete", function () {
                        --n || r();
                      })),
                      this.writable ||
                        (n++,
                        this.once("drain", function () {
                          --n || r();
                        }));
                  } else r();
                },
              },
              {
                key: "poll",
                value: function () {
                  (this.polling = !0), this.doPoll(), this.emit("poll");
                },
              },
              {
                key: "onData",
                value: function (t) {
                  var e = this;
                  l
                    .decodePayload(t, this.socket.binaryType)
                    .forEach(function (t) {
                      if (
                        ("opening" === e.readyState &&
                          "open" === t.type &&
                          e.onOpen(),
                        "close" === t.type)
                      )
                        return e.onClose(), !1;
                      e.onPacket(t);
                    }),
                    "closed" !== this.readyState &&
                      ((this.polling = !1),
                      this.emit("pollComplete"),
                      "open" === this.readyState && this.poll());
                },
              },
              {
                key: "doClose",
                value: function () {
                  var t = this,
                    e = function () {
                      t.write([{ type: "close" }]);
                    };
                  "open" === this.readyState ? e() : this.once("open", e);
                },
              },
              {
                key: "write",
                value: function (t) {
                  var e = this;
                  (this.writable = !1),
                    l.encodePayload(t, function (t) {
                      e.doWrite(t, function () {
                        (e.writable = !0), e.emit("drain");
                      });
                    });
                },
              },
              {
                key: "uri",
                value: function () {
                  var t = this.query || {},
                    e = this.opts.secure ? "https" : "http",
                    r = "";
                  return (
                    !1 !== this.opts.timestampRequests &&
                      (t[this.opts.timestampParam] = h()),
                    this.supportsBinary || t.sid || (t.b64 = 1),
                    (t = p.encode(t)),
                    this.opts.port &&
                      (("https" === e && 443 !== Number(this.opts.port)) ||
                        ("http" === e && 80 !== Number(this.opts.port))) &&
                      (r = ":" + this.opts.port),
                    t.length && (t = "?" + t),
                    e +
                      "://" +
                      (-1 !== this.opts.hostname.indexOf(":")
                        ? "[" + this.opts.hostname + "]"
                        : this.opts.hostname) +
                      r +
                      this.opts.path +
                      t
                  );
                },
              },
              {
                key: "name",
                get: function () {
                  return "polling";
                },
              },
            ]) && i(e.prototype, r),
            n && i(e, n),
            c
          );
        })(f);
      t.exports = y;
    },
    function (t, e) {
      var r = Object.create(null);
      (r.open = "0"),
        (r.close = "1"),
        (r.ping = "2"),
        (r.pong = "3"),
        (r.message = "4"),
        (r.upgrade = "5"),
        (r.noop = "6");
      var n = Object.create(null);
      Object.keys(r).forEach(function (t) {
        n[r[t]] = t;
      });
      t.exports = {
        PACKET_TYPES: r,
        PACKET_TYPES_REVERSE: n,
        ERROR_PACKET: { type: "error", data: "parser error" },
      };
    },
    function (t, e, r) {
      "use strict";
      var n,
        o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(
          ""
        ),
        i = {},
        s = 0,
        a = 0;
      function u(t) {
        var e = "";
        do {
          (e = o[t % 64] + e), (t = Math.floor(t / 64));
        } while (t > 0);
        return e;
      }
      function c() {
        var t = u(+new Date());
        return t !== n ? ((s = 0), (n = t)) : t + "." + u(s++);
      }
      for (; a < 64; a++) i[o[a]] = a;
      (c.encode = u),
        (c.decode = function (t) {
          var e = 0;
          for (a = 0; a < t.length; a++) e = 64 * e + i[t.charAt(a)];
          return e;
        }),
        (t.exports = c);
    },
    function (t, e) {
      t.exports.pick = function (t) {
        for (
          var e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), n = 1;
          n < e;
          n++
        )
          r[n - 1] = arguments[n];
        return r.reduce(function (e, r) {
          return t.hasOwnProperty(r) && (e[r] = t[r]), e;
        }, {});
      };
    },
    function (t, e, r) {
      var n = r(12);
      (t.exports = function (t, e) {
        return new n(t, e);
      }),
        (t.exports.Socket = n),
        (t.exports.protocol = n.protocol),
        (t.exports.Transport = r(2)),
        (t.exports.transports = r(5)),
        (t.exports.parser = r(0));
    },
    function (t, e, r) {
      function n() {
        return (n =
          Object.assign ||
          function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var r = arguments[e];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
            }
            return t;
          }).apply(this, arguments);
      }
      function o(t) {
        return (o =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function i(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      function s(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function a(t, e) {
        return (a =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function u(t) {
        var e = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var r,
            n = f(t);
          if (e) {
            var o = f(this).constructor;
            r = Reflect.construct(n, arguments, o);
          } else r = n.apply(this, arguments);
          return c(this, r);
        };
      }
      function c(t, e) {
        return !e || ("object" !== o(e) && "function" != typeof e)
          ? (function (t) {
              if (void 0 === t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return t;
            })(t)
          : e;
      }
      function f(t) {
        return (f = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      var p = r(5),
        l = r(3),
        h = r(0),
        y = r(21),
        d = r(4),
        m = (function (t) {
          !(function (t, e) {
            if ("function" != typeof e && null !== e)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              e && a(t, e);
          })(l, t);
          var e,
            r,
            c,
            f = u(l);
          function l(t) {
            var e,
              r =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {};
            return (
              i(this, l),
              (e = f.call(this)),
              t && "object" === o(t) && ((r = t), (t = null)),
              t
                ? ((t = y(t)),
                  (r.hostname = t.host),
                  (r.secure = "https" === t.protocol || "wss" === t.protocol),
                  (r.port = t.port),
                  t.query && (r.query = t.query))
                : r.host && (r.hostname = y(r.host).host),
              (e.secure =
                null != r.secure
                  ? r.secure
                  : "undefined" != typeof location &&
                    "https:" === location.protocol),
              r.hostname && !r.port && (r.port = e.secure ? "443" : "80"),
              (e.hostname =
                r.hostname ||
                ("undefined" != typeof location
                  ? location.hostname
                  : "localhost")),
              (e.port =
                r.port ||
                ("undefined" != typeof location && location.port
                  ? location.port
                  : e.secure
                  ? 443
                  : 80)),
              (e.transports = r.transports || ["polling", "websocket"]),
              (e.readyState = ""),
              (e.writeBuffer = []),
              (e.prevBufferLen = 0),
              (e.opts = n(
                {
                  path: "/engine.io",
                  agent: !1,
                  withCredentials: !1,
                  upgrade: !0,
                  jsonp: !0,
                  timestampParam: "t",
                  rememberUpgrade: !1,
                  rejectUnauthorized: !0,
                  perMessageDeflate: { threshold: 1024 },
                  transportOptions: {},
                  closeOnBeforeunload: !0,
                },
                r
              )),
              (e.opts.path = e.opts.path.replace(/\/$/, "") + "/"),
              "string" == typeof e.opts.query &&
                (e.opts.query = d.decode(e.opts.query)),
              (e.id = null),
              (e.upgrades = null),
              (e.pingInterval = null),
              (e.pingTimeout = null),
              (e.pingTimeoutTimer = null),
              "function" == typeof addEventListener &&
                (e.opts.closeOnBeforeunload &&
                  addEventListener(
                    "beforeunload",
                    function () {
                      e.transport &&
                        (e.transport.removeAllListeners(), e.transport.close());
                    },
                    !1
                  ),
                "localhost" !== e.hostname &&
                  ((e.offlineEventListener = function () {
                    e.onClose("transport close");
                  }),
                  addEventListener("offline", e.offlineEventListener, !1))),
              e.open(),
              e
            );
          }
          return (
            (e = l),
            (r = [
              {
                key: "createTransport",
                value: function (t) {
                  var e = (function (t) {
                    var e = {};
                    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
                    return e;
                  })(this.opts.query);
                  (e.EIO = h.protocol),
                    (e.transport = t),
                    this.id && (e.sid = this.id);
                  var r = n({}, this.opts.transportOptions[t], this.opts, {
                    query: e,
                    socket: this,
                    hostname: this.hostname,
                    secure: this.secure,
                    port: this.port,
                  });
                  return new p[t](r);
                },
              },
              {
                key: "open",
                value: function () {
                  var t,
                    e = this;
                  if (
                    this.opts.rememberUpgrade &&
                    l.priorWebsocketSuccess &&
                    -1 !== this.transports.indexOf("websocket")
                  )
                    t = "websocket";
                  else {
                    if (0 === this.transports.length)
                      return void setTimeout(function () {
                        e.emit("error", "No transports available");
                      }, 0);
                    t = this.transports[0];
                  }
                  this.readyState = "opening";
                  try {
                    t = this.createTransport(t);
                  } catch (t) {
                    return this.transports.shift(), void this.open();
                  }
                  t.open(), this.setTransport(t);
                },
              },
              {
                key: "setTransport",
                value: function (t) {
                  var e = this;
                  this.transport && this.transport.removeAllListeners(),
                    (this.transport = t),
                    t
                      .on("drain", this.onDrain.bind(this))
                      .on("packet", this.onPacket.bind(this))
                      .on("error", this.onError.bind(this))
                      .on("close", function () {
                        e.onClose("transport close");
                      });
                },
              },
              {
                key: "probe",
                value: function (t) {
                  var e = this,
                    r = this.createTransport(t, { probe: 1 }),
                    n = !1;
                  l.priorWebsocketSuccess = !1;
                  var o = function () {
                    n ||
                      (r.send([{ type: "ping", data: "probe" }]),
                      r.once("packet", function (t) {
                        if (!n)
                          if ("pong" === t.type && "probe" === t.data) {
                            if (
                              ((e.upgrading = !0), e.emit("upgrading", r), !r)
                            )
                              return;
                            (l.priorWebsocketSuccess = "websocket" === r.name),
                              e.transport.pause(function () {
                                n ||
                                  ("closed" !== e.readyState &&
                                    (f(),
                                    e.setTransport(r),
                                    r.send([{ type: "upgrade" }]),
                                    e.emit("upgrade", r),
                                    (r = null),
                                    (e.upgrading = !1),
                                    e.flush()));
                              });
                          } else {
                            var o = new Error("probe error");
                            (o.transport = r.name), e.emit("upgradeError", o);
                          }
                      }));
                  };
                  function i() {
                    n || ((n = !0), f(), r.close(), (r = null));
                  }
                  var s = function (t) {
                    var n = new Error("probe error: " + t);
                    (n.transport = r.name), i(), e.emit("upgradeError", n);
                  };
                  function a() {
                    s("transport closed");
                  }
                  function u() {
                    s("socket closed");
                  }
                  function c(t) {
                    r && t.name !== r.name && i();
                  }
                  var f = function () {
                    r.removeListener("open", o),
                      r.removeListener("error", s),
                      r.removeListener("close", a),
                      e.removeListener("close", u),
                      e.removeListener("upgrading", c);
                  };
                  r.once("open", o),
                    r.once("error", s),
                    r.once("close", a),
                    this.once("close", u),
                    this.once("upgrading", c),
                    r.open();
                },
              },
              {
                key: "onOpen",
                value: function () {
                  if (
                    ((this.readyState = "open"),
                    (l.priorWebsocketSuccess =
                      "websocket" === this.transport.name),
                    this.emit("open"),
                    this.flush(),
                    "open" === this.readyState &&
                      this.opts.upgrade &&
                      this.transport.pause)
                  )
                    for (var t = 0, e = this.upgrades.length; t < e; t++)
                      this.probe(this.upgrades[t]);
                },
              },
              {
                key: "onPacket",
                value: function (t) {
                  if (
                    "opening" === this.readyState ||
                    "open" === this.readyState ||
                    "closing" === this.readyState
                  )
                    switch (
                      (this.emit("packet", t), this.emit("heartbeat"), t.type)
                    ) {
                      case "open":
                        this.onHandshake(JSON.parse(t.data));
                        break;
                      case "ping":
                        this.resetPingTimeout(),
                          this.sendPacket("pong"),
                          this.emit("ping"),
                          this.emit("pong");
                        break;
                      case "error":
                        var e = new Error("server error");
                        (e.code = t.data), this.onError(e);
                        break;
                      case "message":
                        this.emit("data", t.data), this.emit("message", t.data);
                    }
                },
              },
              {
                key: "onHandshake",
                value: function (t) {
                  this.emit("handshake", t),
                    (this.id = t.sid),
                    (this.transport.query.sid = t.sid),
                    (this.upgrades = this.filterUpgrades(t.upgrades)),
                    (this.pingInterval = t.pingInterval),
                    (this.pingTimeout = t.pingTimeout),
                    this.onOpen(),
                    "closed" !== this.readyState && this.resetPingTimeout();
                },
              },
              {
                key: "resetPingTimeout",
                value: function () {
                  var t = this;
                  clearTimeout(this.pingTimeoutTimer),
                    (this.pingTimeoutTimer = setTimeout(function () {
                      t.onClose("ping timeout");
                    }, this.pingInterval + this.pingTimeout)),
                    this.opts.autoUnref && this.pingTimeoutTimer.unref();
                },
              },
              {
                key: "onDrain",
                value: function () {
                  this.writeBuffer.splice(0, this.prevBufferLen),
                    (this.prevBufferLen = 0),
                    0 === this.writeBuffer.length
                      ? this.emit("drain")
                      : this.flush();
                },
              },
              {
                key: "flush",
                value: function () {
                  "closed" !== this.readyState &&
                    this.transport.writable &&
                    !this.upgrading &&
                    this.writeBuffer.length &&
                    (this.transport.send(this.writeBuffer),
                    (this.prevBufferLen = this.writeBuffer.length),
                    this.emit("flush"));
                },
              },
              {
                key: "write",
                value: function (t, e, r) {
                  return this.sendPacket("message", t, e, r), this;
                },
              },
              {
                key: "send",
                value: function (t, e, r) {
                  return this.sendPacket("message", t, e, r), this;
                },
              },
              {
                key: "sendPacket",
                value: function (t, e, r, n) {
                  if (
                    ("function" == typeof e && ((n = e), (e = void 0)),
                    "function" == typeof r && ((n = r), (r = null)),
                    "closing" !== this.readyState &&
                      "closed" !== this.readyState)
                  ) {
                    (r = r || {}).compress = !1 !== r.compress;
                    var o = { type: t, data: e, options: r };
                    this.emit("packetCreate", o),
                      this.writeBuffer.push(o),
                      n && this.once("flush", n),
                      this.flush();
                  }
                },
              },
              {
                key: "close",
                value: function () {
                  var t = this,
                    e = function () {
                      t.onClose("forced close"), t.transport.close();
                    },
                    r = function r() {
                      t.removeListener("upgrade", r),
                        t.removeListener("upgradeError", r),
                        e();
                    },
                    n = function () {
                      t.once("upgrade", r), t.once("upgradeError", r);
                    };
                  return (
                    ("opening" !== this.readyState &&
                      "open" !== this.readyState) ||
                      ((this.readyState = "closing"),
                      this.writeBuffer.length
                        ? this.once("drain", function () {
                            t.upgrading ? n() : e();
                          })
                        : this.upgrading
                        ? n()
                        : e()),
                    this
                  );
                },
              },
              {
                key: "onError",
                value: function (t) {
                  (l.priorWebsocketSuccess = !1),
                    this.emit("error", t),
                    this.onClose("transport error", t);
                },
              },
              {
                key: "onClose",
                value: function (t, e) {
                  ("opening" !== this.readyState &&
                    "open" !== this.readyState &&
                    "closing" !== this.readyState) ||
                    (clearTimeout(this.pingIntervalTimer),
                    clearTimeout(this.pingTimeoutTimer),
                    this.transport.removeAllListeners("close"),
                    this.transport.close(),
                    this.transport.removeAllListeners(),
                    "function" == typeof removeEventListener &&
                      removeEventListener(
                        "offline",
                        this.offlineEventListener,
                        !1
                      ),
                    (this.readyState = "closed"),
                    (this.id = null),
                    this.emit("close", t, e),
                    (this.writeBuffer = []),
                    (this.prevBufferLen = 0));
                },
              },
              {
                key: "filterUpgrades",
                value: function (t) {
                  for (var e = [], r = 0, n = t.length; r < n; r++)
                    ~this.transports.indexOf(t[r]) && e.push(t[r]);
                  return e;
                },
              },
            ]) && s(e.prototype, r),
            c && s(e, c),
            l
          );
        })(l);
      (m.priorWebsocketSuccess = !1),
        (m.protocol = h.protocol),
        (t.exports = m);
    },
    function (t, e) {
      try {
        t.exports =
          "undefined" != typeof XMLHttpRequest &&
          "withCredentials" in new XMLHttpRequest();
      } catch (e) {
        t.exports = !1;
      }
    },
    function (t, e, r) {
      function n(t) {
        return (n =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function o() {
        return (o =
          Object.assign ||
          function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var r = arguments[e];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
            }
            return t;
          }).apply(this, arguments);
      }
      function i(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      function s(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function a(t, e, r) {
        return e && s(t.prototype, e), r && s(t, r), t;
      }
      function u(t, e) {
        if ("function" != typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && c(t, e);
      }
      function c(t, e) {
        return (c =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function f(t) {
        var e = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var r,
            n = l(t);
          if (e) {
            var o = l(this).constructor;
            r = Reflect.construct(n, arguments, o);
          } else r = n.apply(this, arguments);
          return p(this, r);
        };
      }
      function p(t, e) {
        return !e || ("object" !== n(e) && "function" != typeof e)
          ? (function (t) {
              if (void 0 === t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return t;
            })(t)
          : e;
      }
      function l(t) {
        return (l = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      var h = r(6),
        y = r(7),
        d = r(3),
        m = r(10).pick,
        v = r(1);
      function b() {}
      var g = null != new h({ xdomain: !1 }).responseType,
        w = (function (t) {
          u(r, t);
          var e = f(r);
          function r(t) {
            var n;
            if (
              (i(this, r),
              (n = e.call(this, t)),
              "undefined" != typeof location)
            ) {
              var o = "https:" === location.protocol,
                s = location.port;
              s || (s = o ? 443 : 80),
                (n.xd =
                  ("undefined" != typeof location &&
                    t.hostname !== location.hostname) ||
                  s !== t.port),
                (n.xs = t.secure !== o);
            }
            var a = t && t.forceBase64;
            return (n.supportsBinary = g && !a), n;
          }
          return (
            a(r, [
              {
                key: "request",
                value: function () {
                  var t =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {};
                  return (
                    o(t, { xd: this.xd, xs: this.xs }, this.opts),
                    new k(this.uri(), t)
                  );
                },
              },
              {
                key: "doWrite",
                value: function (t, e) {
                  var r = this,
                    n = this.request({ method: "POST", data: t });
                  n.on("success", e),
                    n.on("error", function (t) {
                      r.onError("xhr post error", t);
                    });
                },
              },
              {
                key: "doPoll",
                value: function () {
                  var t = this,
                    e = this.request();
                  e.on("data", this.onData.bind(this)),
                    e.on("error", function (e) {
                      t.onError("xhr poll error", e);
                    }),
                    (this.pollXhr = e);
                },
              },
            ]),
            r
          );
        })(y),
        k = (function (t) {
          u(r, t);
          var e = f(r);
          function r(t, n) {
            var o;
            return (
              i(this, r),
              ((o = e.call(this)).opts = n),
              (o.method = n.method || "GET"),
              (o.uri = t),
              (o.async = !1 !== n.async),
              (o.data = void 0 !== n.data ? n.data : null),
              o.create(),
              o
            );
          }
          return (
            a(r, [
              {
                key: "create",
                value: function () {
                  var t = this,
                    e = m(
                      this.opts,
                      "agent",
                      "enablesXDR",
                      "pfx",
                      "key",
                      "passphrase",
                      "cert",
                      "ca",
                      "ciphers",
                      "rejectUnauthorized",
                      "autoUnref"
                    );
                  (e.xdomain = !!this.opts.xd), (e.xscheme = !!this.opts.xs);
                  var n = (this.xhr = new h(e));
                  try {
                    n.open(this.method, this.uri, this.async);
                    try {
                      if (this.opts.extraHeaders)
                        for (var o in (n.setDisableHeaderCheck &&
                          n.setDisableHeaderCheck(!0),
                        this.opts.extraHeaders))
                          this.opts.extraHeaders.hasOwnProperty(o) &&
                            n.setRequestHeader(o, this.opts.extraHeaders[o]);
                    } catch (t) {}
                    if ("POST" === this.method)
                      try {
                        n.setRequestHeader(
                          "Content-type",
                          "text/plain;charset=UTF-8"
                        );
                      } catch (t) {}
                    try {
                      n.setRequestHeader("Accept", "*/*");
                    } catch (t) {}
                    "withCredentials" in n &&
                      (n.withCredentials = this.opts.withCredentials),
                      this.opts.requestTimeout &&
                        (n.timeout = this.opts.requestTimeout),
                      this.hasXDR()
                        ? ((n.onload = function () {
                            t.onLoad();
                          }),
                          (n.onerror = function () {
                            t.onError(n.responseText);
                          }))
                        : (n.onreadystatechange = function () {
                            4 === n.readyState &&
                              (200 === n.status || 1223 === n.status
                                ? t.onLoad()
                                : setTimeout(function () {
                                    t.onError(
                                      "number" == typeof n.status ? n.status : 0
                                    );
                                  }, 0));
                          }),
                      n.send(this.data);
                  } catch (e) {
                    return void setTimeout(function () {
                      t.onError(e);
                    }, 0);
                  }
                  "undefined" != typeof document &&
                    ((this.index = r.requestsCount++),
                    (r.requests[this.index] = this));
                },
              },
              {
                key: "onSuccess",
                value: function () {
                  this.emit("success"), this.cleanup();
                },
              },
              {
                key: "onData",
                value: function (t) {
                  this.emit("data", t), this.onSuccess();
                },
              },
              {
                key: "onError",
                value: function (t) {
                  this.emit("error", t), this.cleanup(!0);
                },
              },
              {
                key: "cleanup",
                value: function (t) {
                  if (void 0 !== this.xhr && null !== this.xhr) {
                    if (
                      (this.hasXDR()
                        ? (this.xhr.onload = this.xhr.onerror = b)
                        : (this.xhr.onreadystatechange = b),
                      t)
                    )
                      try {
                        this.xhr.abort();
                      } catch (t) {}
                    "undefined" != typeof document &&
                      delete r.requests[this.index],
                      (this.xhr = null);
                  }
                },
              },
              {
                key: "onLoad",
                value: function () {
                  var t = this.xhr.responseText;
                  null !== t && this.onData(t);
                },
              },
              {
                key: "hasXDR",
                value: function () {
                  return (
                    "undefined" != typeof XDomainRequest &&
                    !this.xs &&
                    this.enablesXDR
                  );
                },
              },
              {
                key: "abort",
                value: function () {
                  this.cleanup();
                },
              },
            ]),
            r
          );
        })(d);
      if (
        ((k.requestsCount = 0),
        (k.requests = {}),
        "undefined" != typeof document)
      )
        if ("function" == typeof attachEvent) attachEvent("onunload", O);
        else if ("function" == typeof addEventListener) {
          addEventListener("onpagehide" in v ? "pagehide" : "unload", O, !1);
        }
      function O() {
        for (var t in k.requests)
          k.requests.hasOwnProperty(t) && k.requests[t].abort();
      }
      (t.exports = w), (t.exports.Request = k);
    },
    function (t, e, r) {
      var n = r(8).PACKET_TYPES,
        o =
          "function" == typeof Blob ||
          ("undefined" != typeof Blob &&
            "[object BlobConstructor]" ===
              Object.prototype.toString.call(Blob)),
        i = "function" == typeof ArrayBuffer,
        s = function (t, e) {
          var r = new FileReader();
          return (
            (r.onload = function () {
              var t = r.result.split(",")[1];
              e("b" + t);
            }),
            r.readAsDataURL(t)
          );
        };
      t.exports = function (t, e, r) {
        var a,
          u = t.type,
          c = t.data;
        return o && c instanceof Blob
          ? e
            ? r(c)
            : s(c, r)
          : i &&
            (c instanceof ArrayBuffer ||
              ((a = c),
              "function" == typeof ArrayBuffer.isView
                ? ArrayBuffer.isView(a)
                : a && a.buffer instanceof ArrayBuffer))
          ? e
            ? r(c instanceof ArrayBuffer ? c : c.buffer)
            : s(new Blob([c]), r)
          : r(n[u] + (c || ""));
      };
    },
    function (t, e, r) {
      var n,
        o = r(8),
        i = o.PACKET_TYPES_REVERSE,
        s = o.ERROR_PACKET;
      "function" == typeof ArrayBuffer && (n = r(17));
      var a = function (t, e) {
          if (n) {
            var r = n.decode(t);
            return u(r, e);
          }
          return { base64: !0, data: t };
        },
        u = function (t, e) {
          switch (e) {
            case "blob":
              return t instanceof ArrayBuffer ? new Blob([t]) : t;
            case "arraybuffer":
            default:
              return t;
          }
        };
      t.exports = function (t, e) {
        if ("string" != typeof t) return { type: "message", data: u(t, e) };
        var r = t.charAt(0);
        return "b" === r
          ? { type: "message", data: a(t.substring(1), e) }
          : i[r]
          ? t.length > 1
            ? { type: i[r], data: t.substring(1) }
            : { type: i[r] }
          : s;
      };
    },
    function (t, e) {
      !(function (t) {
        "use strict";
        (e.encode = function (e) {
          var r,
            n = new Uint8Array(e),
            o = n.length,
            i = "";
          for (r = 0; r < o; r += 3)
            (i += t[n[r] >> 2]),
              (i += t[((3 & n[r]) << 4) | (n[r + 1] >> 4)]),
              (i += t[((15 & n[r + 1]) << 2) | (n[r + 2] >> 6)]),
              (i += t[63 & n[r + 2]]);
          return (
            o % 3 == 2
              ? (i = i.substring(0, i.length - 1) + "=")
              : o % 3 == 1 && (i = i.substring(0, i.length - 2) + "=="),
            i
          );
        }),
          (e.decode = function (e) {
            var r,
              n,
              o,
              i,
              s,
              a = 0.75 * e.length,
              u = e.length,
              c = 0;
            "=" === e[e.length - 1] && (a--, "=" === e[e.length - 2] && a--);
            var f = new ArrayBuffer(a),
              p = new Uint8Array(f);
            for (r = 0; r < u; r += 4)
              (n = t.indexOf(e[r])),
                (o = t.indexOf(e[r + 1])),
                (i = t.indexOf(e[r + 2])),
                (s = t.indexOf(e[r + 3])),
                (p[c++] = (n << 2) | (o >> 4)),
                (p[c++] = ((15 & o) << 4) | (i >> 2)),
                (p[c++] = ((3 & i) << 6) | (63 & s));
            return f;
          });
      })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
    },
    function (t, e, r) {
      function n(t) {
        return (n =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function o(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function i(t, e, r) {
        return (i =
          "undefined" != typeof Reflect && Reflect.get
            ? Reflect.get
            : function (t, e, r) {
                var n = (function (t, e) {
                  for (
                    ;
                    !Object.prototype.hasOwnProperty.call(t, e) &&
                    null !== (t = f(t));

                  );
                  return t;
                })(t, e);
                if (n) {
                  var o = Object.getOwnPropertyDescriptor(n, e);
                  return o.get ? o.get.call(r) : o.value;
                }
              })(t, e, r || t);
      }
      function s(t, e) {
        return (s =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function a(t) {
        var e = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var r,
            n = f(t);
          if (e) {
            var o = f(this).constructor;
            r = Reflect.construct(n, arguments, o);
          } else r = n.apply(this, arguments);
          return u(this, r);
        };
      }
      function u(t, e) {
        return !e || ("object" !== n(e) && "function" != typeof e) ? c(t) : e;
      }
      function c(t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      }
      function f(t) {
        return (f = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      var p,
        l = r(7),
        h = r(1),
        y = /\n/g,
        d = /\\n/g,
        m = (function (t) {
          !(function (t, e) {
            if ("function" != typeof e && null !== e)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              e && s(t, e);
          })(l, t);
          var e,
            r,
            n,
            u = a(l);
          function l(t) {
            var e;
            return (
              (function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, l),
              ((e = u.call(this, t)).query = e.query || {}),
              p || (p = h.___eio = h.___eio || []),
              (e.index = p.length),
              p.push(e.onData.bind(c(e))),
              (e.query.j = e.index),
              e
            );
          }
          return (
            (e = l),
            (r = [
              {
                key: "doClose",
                value: function () {
                  this.script &&
                    ((this.script.onerror = function () {}),
                    this.script.parentNode.removeChild(this.script),
                    (this.script = null)),
                    this.form &&
                      (this.form.parentNode.removeChild(this.form),
                      (this.form = null),
                      (this.iframe = null)),
                    i(f(l.prototype), "doClose", this).call(this);
                },
              },
              {
                key: "doPoll",
                value: function () {
                  var t = this,
                    e = document.createElement("script");
                  this.script &&
                    (this.script.parentNode.removeChild(this.script),
                    (this.script = null)),
                    (e.async = !0),
                    (e.src = this.uri()),
                    (e.onerror = function (e) {
                      t.onError("jsonp poll error", e);
                    });
                  var r = document.getElementsByTagName("script")[0];
                  r
                    ? r.parentNode.insertBefore(e, r)
                    : (document.head || document.body).appendChild(e),
                    (this.script = e),
                    "undefined" != typeof navigator &&
                      /gecko/i.test(navigator.userAgent) &&
                      setTimeout(function () {
                        var t = document.createElement("iframe");
                        document.body.appendChild(t),
                          document.body.removeChild(t);
                      }, 100);
                },
              },
              {
                key: "doWrite",
                value: function (t, e) {
                  var r,
                    n = this;
                  if (!this.form) {
                    var o = document.createElement("form"),
                      i = document.createElement("textarea"),
                      s = (this.iframeId = "eio_iframe_" + this.index);
                    (o.className = "socketio"),
                      (o.style.position = "absolute"),
                      (o.style.top = "-1000px"),
                      (o.style.left = "-1000px"),
                      (o.target = s),
                      (o.method = "POST"),
                      o.setAttribute("accept-charset", "utf-8"),
                      (i.name = "d"),
                      o.appendChild(i),
                      document.body.appendChild(o),
                      (this.form = o),
                      (this.area = i);
                  }
                  function a() {
                    u(), e();
                  }
                  this.form.action = this.uri();
                  var u = function () {
                    if (n.iframe)
                      try {
                        n.form.removeChild(n.iframe);
                      } catch (t) {
                        n.onError("jsonp polling iframe removal error", t);
                      }
                    try {
                      var t =
                        '<iframe src="javascript:0" name="' + n.iframeId + '">';
                      r = document.createElement(t);
                    } catch (t) {
                      ((r = document.createElement("iframe")).name =
                        n.iframeId),
                        (r.src = "javascript:0");
                    }
                    (r.id = n.iframeId), n.form.appendChild(r), (n.iframe = r);
                  };
                  u(),
                    (t = t.replace(d, "\\\n")),
                    (this.area.value = t.replace(y, "\\n"));
                  try {
                    this.form.submit();
                  } catch (t) {}
                  this.iframe.attachEvent
                    ? (this.iframe.onreadystatechange = function () {
                        "complete" === n.iframe.readyState && a();
                      })
                    : (this.iframe.onload = a);
                },
              },
              {
                key: "supportsBinary",
                get: function () {
                  return !1;
                },
              },
            ]) && o(e.prototype, r),
            n && o(e, n),
            l
          );
        })(l);
      t.exports = m;
    },
    function (t, e, r) {
      function n(t) {
        return (n =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function o(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function i(t, e) {
        return (i =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function s(t) {
        var e = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var r,
            n = u(t);
          if (e) {
            var o = u(this).constructor;
            r = Reflect.construct(n, arguments, o);
          } else r = n.apply(this, arguments);
          return a(this, r);
        };
      }
      function a(t, e) {
        return !e || ("object" !== n(e) && "function" != typeof e)
          ? (function (t) {
              if (void 0 === t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return t;
            })(t)
          : e;
      }
      function u(t) {
        return (u = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      var c = r(2),
        f = r(0),
        p = r(4),
        l = r(9),
        h = r(10).pick,
        y = r(20),
        d = y.WebSocket,
        m = y.usingBrowserWebSocket,
        v = y.defaultBinaryType,
        b = y.nextTick,
        g =
          "undefined" != typeof navigator &&
          "string" == typeof navigator.product &&
          "reactnative" === navigator.product.toLowerCase(),
        w = (function (t) {
          !(function (t, e) {
            if ("function" != typeof e && null !== e)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              e && i(t, e);
          })(u, t);
          var e,
            r,
            n,
            a = s(u);
          function u(t) {
            var e;
            return (
              (function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, u),
              ((e = a.call(this, t)).supportsBinary = !t.forceBase64),
              e
            );
          }
          return (
            (e = u),
            (r = [
              {
                key: "doOpen",
                value: function () {
                  if (this.check()) {
                    var t = this.uri(),
                      e = this.opts.protocols,
                      r = g
                        ? {}
                        : h(
                            this.opts,
                            "agent",
                            "perMessageDeflate",
                            "pfx",
                            "key",
                            "passphrase",
                            "cert",
                            "ca",
                            "ciphers",
                            "rejectUnauthorized",
                            "localAddress",
                            "protocolVersion",
                            "origin",
                            "maxPayload",
                            "family",
                            "checkServerIdentity"
                          );
                    this.opts.extraHeaders &&
                      (r.headers = this.opts.extraHeaders);
                    try {
                      this.ws =
                        m && !g ? (e ? new d(t, e) : new d(t)) : new d(t, e, r);
                    } catch (t) {
                      return this.emit("error", t);
                    }
                    (this.ws.binaryType = this.socket.binaryType || v),
                      this.addEventListeners();
                  }
                },
              },
              {
                key: "addEventListeners",
                value: function () {
                  var t = this;
                  (this.ws.onopen = function () {
                    t.opts.autoUnref && t.ws._socket.unref(), t.onOpen();
                  }),
                    (this.ws.onclose = this.onClose.bind(this)),
                    (this.ws.onmessage = function (e) {
                      return t.onData(e.data);
                    }),
                    (this.ws.onerror = function (e) {
                      return t.onError("websocket error", e);
                    });
                },
              },
              {
                key: "write",
                value: function (t) {
                  var e = this;
                  this.writable = !1;
                  for (
                    var r = function (r) {
                        var n = t[r],
                          o = r === t.length - 1;
                        f.encodePacket(n, e.supportsBinary, function (t) {
                          var r = {};
                          m ||
                            (n.options && (r.compress = n.options.compress),
                            e.opts.perMessageDeflate &&
                              ("string" == typeof t
                                ? Buffer.byteLength(t)
                                : t.length) <
                                e.opts.perMessageDeflate.threshold &&
                              (r.compress = !1));
                          try {
                            m ? e.ws.send(t) : e.ws.send(t, r);
                          } catch (t) {}
                          o &&
                            b(function () {
                              (e.writable = !0), e.emit("drain");
                            });
                        });
                      },
                      n = 0;
                    n < t.length;
                    n++
                  )
                    r(n);
                },
              },
              {
                key: "onClose",
                value: function () {
                  c.prototype.onClose.call(this);
                },
              },
              {
                key: "doClose",
                value: function () {
                  void 0 !== this.ws && (this.ws.close(), (this.ws = null));
                },
              },
              {
                key: "uri",
                value: function () {
                  var t = this.query || {},
                    e = this.opts.secure ? "wss" : "ws",
                    r = "";
                  return (
                    this.opts.port &&
                      (("wss" === e && 443 !== Number(this.opts.port)) ||
                        ("ws" === e && 80 !== Number(this.opts.port))) &&
                      (r = ":" + this.opts.port),
                    this.opts.timestampRequests &&
                      (t[this.opts.timestampParam] = l()),
                    this.supportsBinary || (t.b64 = 1),
                    (t = p.encode(t)).length && (t = "?" + t),
                    e +
                      "://" +
                      (-1 !== this.opts.hostname.indexOf(":")
                        ? "[" + this.opts.hostname + "]"
                        : this.opts.hostname) +
                      r +
                      this.opts.path +
                      t
                  );
                },
              },
              {
                key: "check",
                value: function () {
                  return !(
                    !d ||
                    ("__initialize" in d && this.name === u.prototype.name)
                  );
                },
              },
              {
                key: "name",
                get: function () {
                  return "websocket";
                },
              },
            ]) && o(e.prototype, r),
            n && o(e, n),
            u
          );
        })(c);
      t.exports = w;
    },
    function (t, e, r) {
      var n = r(1),
        o =
          "function" == typeof Promise && "function" == typeof Promise.resolve
            ? function (t) {
                return Promise.resolve().then(t);
              }
            : function (t) {
                return setTimeout(t, 0);
              };
      t.exports = {
        WebSocket: n.WebSocket || n.MozWebSocket,
        usingBrowserWebSocket: !0,
        defaultBinaryType: "arraybuffer",
        nextTick: o,
      };
    },
    function (t, e) {
      var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        n = [
          "source",
          "protocol",
          "authority",
          "userInfo",
          "user",
          "password",
          "host",
          "port",
          "relative",
          "path",
          "directory",
          "file",
          "query",
          "anchor",
        ];
      t.exports = function (t) {
        var e = t,
          o = t.indexOf("["),
          i = t.indexOf("]");
        -1 != o &&
          -1 != i &&
          (t =
            t.substring(0, o) +
            t.substring(o, i).replace(/:/g, ";") +
            t.substring(i, t.length));
        for (var s, a, u = r.exec(t || ""), c = {}, f = 14; f--; )
          c[n[f]] = u[f] || "";
        return (
          -1 != o &&
            -1 != i &&
            ((c.source = e),
            (c.host = c.host
              .substring(1, c.host.length - 1)
              .replace(/;/g, ":")),
            (c.authority = c.authority
              .replace("[", "")
              .replace("]", "")
              .replace(/;/g, ":")),
            (c.ipv6uri = !0)),
          (c.pathNames = (function (t, e) {
            var r = e.replace(/\/{2,9}/g, "/").split("/");
            ("/" != e.substr(0, 1) && 0 !== e.length) || r.splice(0, 1);
            "/" == e.substr(e.length - 1, 1) && r.splice(r.length - 1, 1);
            return r;
          })(0, c.path)),
          (c.queryKey =
            ((s = c.query),
            (a = {}),
            s.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (t, e, r) {
              e && (a[e] = r);
            }),
            a)),
          c
        );
      };
    },
  ]);
});
