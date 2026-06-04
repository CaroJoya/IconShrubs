import { Sparkles, Star, Crown, Heart } from 'lucide-react'

export function Tutorial() {
    return (
      <div className="glass-card rounded-2xl p-8 mt-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-purple-100 mb-6 flex items-center gap-3">
            <Crown className="w-8 h-8 text-purple-300" />
            📖 Mystical Guide: How to Use Your Icon
            <Sparkles className="w-6 h-6 text-purple-300" />
          </h2>
  
          <div className="space-y-6">
            {/* Steps with mystical styling */}
            {[
              { step: 1, title: "Right-click the app shortcut", desc: "On your desktop, right-click the application shortcut you want to customize.", icon: "✨" },
              { step: 2, title: "Select 'Properties'", desc: "From the context menu, click Properties", icon: "🔮" },
              { step: 3, title: "Click 'Change Icon...'", desc: "In the Properties dialog, look for a button labeled Change Icon... (usually on the Shortcut tab)", icon: "🎨" },
              { step: 4, title: "Click 'Browse...'", desc: "A dialog will open. Click the Browse... button to select a file.", icon: "📁" },
              { step: 5, title: "Select your downloaded .ico file", desc: "Navigate to your Downloads folder and select the pixelicon_*.ico file you downloaded from IconShrubs.", icon: "💎" },
              { step: 6, title: "Click Apply → OK", desc: "Click Apply to preview, then OK to confirm.", icon: "✅" }
            ].map((step) => (
              <div key={step.step} className="flex gap-4 group hover:transform hover:translate-x-2 transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-lg">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-100 text-lg flex items-center gap-2">
                    {step.icon}
                    {step.title}
                  </h3>
                  <p className="text-purple-300 mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
  
            {/* Final step */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-purple-100 text-lg flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-400" />
                  Done! Your icon is updated
                </h3>
                <p className="text-purple-300 mt-1">
                  Your desktop shortcut now displays your custom pixel art icon! ✨
                </p>
              </div>
            </div>
          </div>
  
          {/* Pro Tips */}
          <div className="mt-8 rounded-xl p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
            <h3 className="font-semibold text-purple-100 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              💫 Pro Tips for Magical Icons:
            </h3>
            <ul className="text-purple-300 text-sm space-y-2">
              <li>• ✨ Your downloaded .ico file must be saved on your computer</li>
              <li>• 🎨 This works for any application shortcut on Windows</li>
              <li>• 🌙 The icon changes immediately after clicking OK</li>
              <li>• 🔮 You can always change it back by selecting the original icon</li>
              <li>• ⚡ For system applications, you may need admin rights</li>
            </ul>
          </div>
  
          {/* FAQ */}
          <div className="mt-8">
            <h3 className="font-semibold text-purple-100 mb-4 text-xl flex items-center gap-2">
              <Star className="w-6 h-6" />
              ❓ Mystical FAQs
            </h3>
            <div className="space-y-4">
              {[
                { q: "Can I use this for folder icons?", a: "This method works best for application shortcuts. Folder icon changing requires a different approach." },
                { q: "What if the button isn't visible?", a: "Make sure you're on the 'Shortcut' tab in Properties. Some portable apps may not support icon changing." },
                { q: "Can I undo this change?", a: "Yes! Follow the same steps but select the original icon file in the 'Change Icon' dialog." }
              ].map((faq, i) => (
                <div key={i} className="p-4 rounded-lg bg-white/5">
                  <h4 className="font-medium text-purple-100 mb-1">{faq.q}</h4>
                  <p className="text-purple-300 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }