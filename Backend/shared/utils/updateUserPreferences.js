import User from '#modules/users/user.model.js';
import logger from '#infra/logger/logger.js';

const updateUserPreferences = async (userId, { productId, category, brand, tags = [] }) => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    const preferences = user.preferences;

    // Add productId if not already present
    if (productId && !preferences.viewedProducts.some((id) => id.equals(productId))) {
      preferences.viewedProducts.push(productId);
    }

    // Add category if not already present
    if (category && !preferences.categories.includes(category)) {
      preferences.categories.push(category);
    }

    // Add brand if not already present
    if (brand && !preferences.brands.includes(brand)) {
      preferences.brands.push(brand);
    }

    // Add unique tags
    tags.forEach((tag) => {
      if (!preferences.tags.includes(tag)) {
        preferences.tags.push(tag);
      }
    });

    // Update last viewed time
    preferences.lastViewedAt = new Date();

    await user.save();
  } catch (error) {
    logger.error('Failed to update user preferences:', error.message);
  }
};

export default updateUserPreferences;
