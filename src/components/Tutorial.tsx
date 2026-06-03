export function Tutorial() {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mt-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            📖 How to Use Your Icon (Windows)
          </h2>
  
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Right-click the app shortcut</h3>
                <p className="text-gray-600 mt-1">
                  On your desktop, right-click the application shortcut you want to customize.
                </p>
              </div>
            </div>
  
            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Select "Properties"</h3>
                <p className="text-gray-600 mt-1">
                  From the context menu, click <code className="bg-gray-200 px-2 py-1 rounded text-sm">Properties</code>
                </p>
              </div>
            </div>
  
            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Click "Change Icon..." button</h3>
                <p className="text-gray-600 mt-1">
                  In the Properties dialog, look for a button labeled <code className="bg-gray-200 px-2 py-1 rounded text-sm">Change Icon...</code> (usually on the Shortcut tab)
                </p>
              </div>
            </div>
  
            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                  4
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Click "Browse..."</h3>
                <p className="text-gray-600 mt-1">
                  A dialog will open. Click the <code className="bg-gray-200 px-2 py-1 rounded text-sm">Browse...</code> button to select a file.
                </p>
              </div>
            </div>
  
            {/* Step 5 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                  5
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Select your downloaded .ico file</h3>
                <p className="text-gray-600 mt-1">
                  Navigate to your Downloads folder and select the <code className="bg-gray-200 px-2 py-1 rounded text-sm">pixelicon_*.ico</code> file you downloaded from PixelIcon.
                </p>
              </div>
            </div>
  
            {/* Step 6 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                  6
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Click Apply → OK</h3>
                <p className="text-gray-600 mt-1">
                  Click <code className="bg-gray-200 px-2 py-1 rounded text-sm">Apply</code> to preview, then <code className="bg-gray-200 px-2 py-1 rounded text-sm">OK</code> to confirm.
                </p>
              </div>
            </div>
  
            {/* Step 7 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 text-white font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Done! Your icon is updated</h3>
                <p className="text-gray-600 mt-1">
                  Your desktop shortcut now displays your custom pixel art icon!
                </p>
              </div>
            </div>
          </div>
  
          {/* Visual Example */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Visual Example:</h3>
            <div className="bg-white rounded border border-gray-300 p-4">
              <img
                src="/tutorial-screenshot.png"
                alt="Windows Properties dialog showing Change Icon button"
                className="w-full max-w-2xl mx-auto rounded border border-gray-200"
                onError={(e) => {
                  // Fallback if image not found
                  e.currentTarget.style.display = 'none'
                }}
              />
              <p className="text-sm text-gray-500 mt-4 text-center">
                Windows Properties dialog - Change Icon step
              </p>
            </div>
          </div>
  
          {/* Additional Tips */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Pro Tips:</h3>
            <ul className="text-blue-800 text-sm space-y-2">
              <li>• Your downloaded .ico file must be saved on your computer</li>
              <li>• This works for any application shortcut on Windows</li>
              <li>• The icon changes immediately after clicking OK</li>
              <li>• You can always change it back by selecting the original icon</li>
              <li>• For system applications, you may need admin rights</li>
            </ul>
          </div>
  
          {/* FAQ */}
          <div className="mt-8">
            <h3 className="font-semibold text-gray-900 mb-4">❓ FAQ</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Q: Can I use this for folder icons?</h4>
                <p className="text-gray-600 text-sm">
                  A: This method works best for application shortcuts. Folder icon changing requires a different approach.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Q: What if the button isn't visible?</h4>
                <p className="text-gray-600 text-sm">
                  A: Make sure you're on the "Shortcut" tab in Properties. Some portable apps may not support icon changing.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Q: Can I undo this change?</h4>
                <p className="text-gray-600 text-sm">
                  A: Yes! Follow the same steps but select the original icon file in the "Change Icon" dialog.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }