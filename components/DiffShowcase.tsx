"use client";

import { motion } from "framer-motion";

const diffContent = `@@ -15,8 +15,21 @@ class AuthService:
     def __init__(self, db: Database):
         self.db = db
-        self.secret = "hardcoded"
+        self.secret = os.environ.get("JWT_SECRET")
+        self.session_timeout = 3600
+        self.active_sessions: dict[str, Session] = {}

-    def login(self, user, pwd):
-        if self.db.check(user, pwd):
-            return True
+    def login(self, username: str, password: str) -> str | None:
+        """Authenticate user and create session."""
+        user = self.db.verify_credentials(username, password)
+        if user:
+            session_id = self._create_session(user.id)
+            return session_id
+        return None

+    def _create_session(self, user_id: int) -> str:
+        session_id = secrets.token_urlsafe(32)
+        self.active_sessions[session_id] = Session(
+            user_id=user_id,
+            expires_at=time.time() + self.session_timeout
+        )
+        return session_id`;

const commitMessage = `feat(auth): implement secure session management

- Replace hardcoded secret with environment variable
- Add configurable session timeout (default: 1 hour)
- Implement session tracking with active_sessions dict
- Add type hints for better code clarity
- Create dedicated session creation method
- Return session ID on successful login

BREAKING CHANGE: login() now returns session_id string
instead of boolean`;

const reviewOutput = `## Security Analysis

✓ Removed hardcoded secret - now uses environment variable
✓ Session tokens use cryptographically secure generation
✓ Session expiration implemented

## Code Quality

✓ Added type hints throughout
✓ Improved method naming (check → verify_credentials)
✓ Added docstring for public method

## Suggestions

Consider adding:
• Rate limiting for login attempts
• Session invalidation on password change
• Logging for authentication events`;

export default function DiffShowcase() {
  return (
    <section id="showcase" className="py-10 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="label-mono mb-3 sm:mb-4">How it works</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3 sm:mb-4">
            From <span className="text-navy">diff</span> to{" "}
            <span className="text-golden">commit</span>
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base max-w-lg mx-auto px-2">
            Inyeon analyzes your changes and generates meaningful commit
            messages with AI-powered code review.
          </p>
        </motion.div>

        {/* Showcase grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Left: Git Diff */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <div className="w-1 h-4 bg-zinc-600 shrink-0" />
              <span className="label-mono">git diff</span>
            </div>
            <div className="code-block overflow-hidden hud-corners w-full">
              <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-border flex items-center gap-2">
                <span className="text-zinc-600 text-xs font-mono">
                  backend/auth.py
                </span>
              </div>
              <div className="overflow-x-auto">
                <pre className="p-3 sm:p-4 text-xs sm:text-sm">
                  <code>
                    {diffContent.split("\n").map((line, i) => {
                      let className = "text-zinc-500";
                      if (line.startsWith("+") && !line.startsWith("+++")) {
                        className = "text-emerald-500";
                      } else if (
                        line.startsWith("-") &&
                        !line.startsWith("---")
                      ) {
                        className = "text-red-400";
                      } else if (line.startsWith("@@")) {
                        className = "text-cold-blue";
                      }
                      return (
                        <div key={i} className={`${className} whitespace-pre`}>
                          {line}
                        </div>
                      );
                    })}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>

          {/* Right: Generated output */}
          <div className="flex flex-col gap-4 sm:gap-6 w-full">
            {/* Commit Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full"
            >
              <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                <div className="w-1 h-4 bg-cold-blue shrink-0" />
                <span className="label-mono">Generated Commit</span>
              </div>
              <div className="code-block overflow-hidden hud-corners w-full">
                <div className="overflow-x-auto">
                  <pre className="p-3 sm:p-4 text-xs sm:text-sm whitespace-pre-wrap wrap-break-word">
                    <code>
                      {commitMessage.split("\n").map((line, i) => {
                        let className = "text-zinc-500";
                        if (i === 0) {
                          className = "text-cold-blue font-medium";
                        } else if (line.startsWith("BREAKING")) {
                          className = "text-warm-gold";
                        } else if (line.startsWith("-")) {
                          className = "text-zinc-400";
                        }
                        return (
                          <div key={i} className={className}>
                            {line}
                          </div>
                        );
                      })}
                    </code>
                  </pre>
                </div>
              </div>
            </motion.div>

            {/* AI Review */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                <div className="w-1 h-4 bg-emerald-600 shrink-0" />
                <span className="label-mono">AI Review</span>
              </div>
              <div className="code-block overflow-hidden hud-corners w-full">
                <div className="overflow-x-auto">
                  <pre className="p-3 sm:p-4 text-xs sm:text-sm whitespace-pre-wrap wrap-break-word">
                    <code>
                      {reviewOutput.split("\n").map((line, i) => {
                        let className = "text-zinc-500";
                        if (line.startsWith("##")) {
                          className = "text-zinc-300 font-medium";
                        } else if (line.startsWith("✓")) {
                          className = "text-emerald-500";
                        } else if (line.startsWith("•")) {
                          className = "text-zinc-600";
                        }
                        return (
                          <div key={i} className={className}>
                            {line}
                          </div>
                        );
                      })}
                    </code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Command examples */}
        <motion.div
          className="mt-8 sm:mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {[
            {
              cmd: "inyeon commit --staged",
              desc: "Generate commit from staged changes",
            },
            {
              cmd: "inyeon split --staged",
              desc: "Split into atomic commits",
            },
            {
              cmd: "inyeon review --staged",
              desc: "Get AI code review",
            },
            {
              cmd: "git diff | inyeon analyze",
              desc: "Analyze any diff",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-3 sm:p-5 bg-black group hover:bg-white/2 transition-colors"
            >
              <code className="text-cold-blue text-xs sm:text-sm font-mono group-hover:text-warm-gold transition-colors break-all">
                {item.cmd}
              </code>
              <p className="text-zinc-600 text-xs sm:text-sm mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
