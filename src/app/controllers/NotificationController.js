import Notification from '../schemas/Notifications';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    /**
     * Check if provider_id is a provider
     */
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can load notifications.' });
    }
    // mongoose and sequelize methods are different
    const notifications = await Notification.find({
      user: req.userId, // user is one of the columns in the db
    })
      .sort({ createdAt: 'desc' }) // Show notification in descending order
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    // const notification = await Notification.findById(req.params.id);

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true } // retorno o novo registro atualizado
    );

    return res.json(notification);
  }
}

export default new NotificationController();
