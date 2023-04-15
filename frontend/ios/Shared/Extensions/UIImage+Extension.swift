import UIKit

extension UIImageView {
    public func applyRoundedCorners() {
        layer.cornerRadius = 12
        clipsToBounds = true
    }
}
