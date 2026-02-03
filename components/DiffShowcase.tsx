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
+
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
    <section id="showcase" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-zinc-500 text-sm tracking-[0.2em] uppercase mb-4">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            From <span className="text-navy">diff</span> to{" "}
            <span className="text-golden">commit</span>
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto">
            Inyeon analyzes your changes and generates meaningful commit
            messages with AI-powered code review.
          </p>
        </motion.div>

        {/* Showcase grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Git Diff */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-aurora-pink" />
              <span className="text-text-secondary text-sm">git diff</span>
            </div>
            <div className="code-block overflow-hidden aurora-glow">
              <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                <span className="text-text-secondary text-xs">backend/auth.py</span>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code>
                  {diffContent.split("\n").map((line, i) => {
                    let className = "text-zinc-400";
                    if (line.startsWith("+") && !line.startsWith("+++")) {
                      className = "text-aurora-green";
                    } else if (line.startsWith("-") && !line.startsWith("---")) {
                      className = "text-red-400";
                    } else if (line.startsWith("@@")) {
                      className = "text-aurora-purple";
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
          </motion.div>

          {/* Right: Generated output */}
          <div className="space-y-6">
            {/* Commit Message */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-aurora-cyan" />
                <span className="text-text-secondary text-sm">
                  Generated Commit
                </span>
              </div>
              <div className="code-block overflow-hidden aurora-glow">
                <pre className="p-4 text-sm">
                  <code>
                    {commitMessage.split("\n").map((line, i) => {
                      let className = "text-zinc-400";
                      if (i === 0) {
                        className = "text-aurora-cyan font-medium";
                      } else if (line.startsWith("BREAKING")) {
                        className = "text-aurora-pink";
                      } else if (line.startsWith("-")) {
                        className = "text-zinc-300";
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
            </motion.div>

            {/* AI Review */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-aurora-green" />
                <span className="text-text-secondary text-sm">AI Review</span>
              </div>
              <div className="code-block overflow-hidden">
                <pre className="p-4 text-sm">
                  <code>
                    {reviewOutput.split("\n").map((line, i) => {
                      let className = "text-zinc-400";
                      if (line.startsWith("##")) {
                        className = "text-aurora-purple font-medium";
                      } else if (line.startsWith("✓")) {
                        className = "text-aurora-green";
                      } else if (line.startsWith("•")) {
                        className = "text-zinc-500";
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
            </motion.div>
          </div>
        </div>

        {/* Command examples */}
        <motion.div
          className="mt-20 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { cmd: "inyeon commit --staged", desc: "Generate commit from staged changes" },
            { cmd: "inyeon review --staged", desc: "Get AI code review" },
            { cmd: "git diff | inyeon analyze", desc: "Analyze any diff" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-lg border border-border hover:border-aurora-purple/40 transition-colors group"
            >
              <code className="text-aurora-cyan text-sm group-hover:text-aurora-purple transition-colors">
                {item.cmd}
              </code>
              <p className="text-text-secondary text-xs mt-2">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
