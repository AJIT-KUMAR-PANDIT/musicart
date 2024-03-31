import Product from "../Model/Product.js";
import User from "../Model/User.js";

export const addToCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const { productId } = req.body;

    if (_id && productId) {
      const user = await User.findById(_id);
      const product = await Product.findById(productId);

      if (product) {
        const alreadyInCart = user.cart.find((item) => item.id === productId);
        if (!alreadyInCart) {
          const addCart = {
            id: product._id.valueOf(),
            title: product.title,
            image: product.image,
            price: product.price,
            colour: product.colour,
            useType: product.useType,
            quantity: product.quantity,
            description: product.description,
          };
          await User.findByIdAndUpdate(
            _id,
            { $push: { cart: addCart } },
            { new: true }
          );

          res.status(201).json({ message: "Added to cart succesfully!" });
        } else {
          res.status(400).json({ message: "Product already in cart!" });
        }
      } else {
        res.status(404).json({ message: "Product not found!" });
      }
    } else {
      res.status(400).json({ message: "All inputs required!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const increaseQuantity = async (req, res) => {
  try {
    const { _id } = req.user;

    const { quantity, productId } = req.body;

    if (_id && productId && quantity) {
      const user = await User.findById(_id);
      const product = await Product.findById(productId);

      if (product) {
        const alreadyInCart = user.cart.find((item) => item.id === productId);

        if (alreadyInCart) {
          const updateDoc = await User.updateOne(
            { _id: _id, "cart.id": productId },
            {
              $set: {
                "cart.$.quantity": quantity,
              },
            },
            { new: true }
          );
          res.status(201).json(updateDoc);
        } else {
          res.status(404).json({ message: "Product not found!" });
        }
      } else {
        res.status(404).json({ message: "Product not found!" });
      }
    } else {
      res.status(400).json({ message: "All inputs required!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const { productId } = req.body;

    if (_id && productId) {
      const user = await User.findById(_id);
      const product = await Product.findById(productId);

      if (product) {
        const alreadyInCart = user.cart.find((item) => item.id === productId);

        if (alreadyInCart) {
          await User.findByIdAndUpdate(_id, {
            $pull: {
              cart: { id: productId },
            },
          });
          res
            .status(201)
            .json({ message: "Product removed from cart succesfully!" });
        } else {
          res.status(404).json({ message: "Product not found!" });
        }
      } else {
        res.status(404).json({ message: "Product not found!" });
      }
    } else {
      res.status(400).json({ message: "All inputs required!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
export const removeAllFromCart = async (req, res) => {
  try {
    const { _id } = req.user;

    if (_id) {
      const user = await User.findById(_id);

      if (user) {
        await User.findByIdAndUpdate(_id, {
          $set: {
            cart: [],
          },
        });
        res
          .status(201)
          .json({ message: "All product removed from cart succesfully!" });
      } else {
        res.status(404).json({ message: "Product not found!" });
      }
    } else {
      res.status(400).json({ message: "All inputs required!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
