import os
import json
import argparse
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model

def train_model(data_path, model_save_path, epochs=3, batch_size=8):
    
    os.makedirs(model_save_path, exist_ok=True)
    
   
    IMG_SIZE = 224
    
    print(f"Training model with data from {data_path}")
    print(f"Model will be saved to {model_save_path}")
    print(f"Training parameters: epochs={epochs}, batch_size={batch_size}")
 
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        fill_mode='nearest'
    )
    
    val_datagen = ImageDataGenerator(rescale=1./255)
    
    train_generator = train_datagen.flow_from_directory(
        os.path.join(data_path, "Train"),
        target_size=(IMG_SIZE, IMG_SIZE),
        batch_size=batch_size,
        class_mode='categorical'
    )
    
    validation_generator = val_datagen.flow_from_directory(
        os.path.join(data_path, "Validation"),
        target_size=(IMG_SIZE, IMG_SIZE),
        batch_size=batch_size,
        class_mode='categorical'
    )
    
    NUM_CLASSES = len(train_generator.class_indices)
    print(f"Training model for {NUM_CLASSES} classes: {train_generator.class_indices}")
    
    
    base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(IMG_SIZE, IMG_SIZE, 3))
    
    
    for layer in base_model.layers:
        layer.trainable = False
    
   
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(256, activation='relu')(x)
    x = Dropout(0.5)(x)
    predictions = Dense(NUM_CLASSES, activation='softmax')(x)
    
    model = Model(inputs=base_model.input, outputs=predictions)
    
  
    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
   
    print("Starting model training...")
    history = model.fit(
        train_generator,
        steps_per_epoch=train_generator.samples // batch_size,
        validation_data=validation_generator,
        validation_steps=validation_generator.samples // batch_size,
        epochs=epochs
    )
    
  
    model.save(model_save_path)
    print(f"Model saved to {model_save_path}")
    
   
    with open(os.path.join(model_save_path, "class_indices.json"), "w") as f:
        json.dump(train_generator.class_indices, f)
    
    
    health_categories = {
        "healthy": ["healthy"],
        "diseased": ["diseased"],
        "nutrient_deficient": ["nutrient-deficient"]
    }
    
    with open(os.path.join(model_save_path, "health_categories.json"), "w") as f:
        json.dump(health_categories, f)
    
    print("Model training complete!")
    print(f"Final validation accuracy: {history.history['val_accuracy'][-1]:.4f}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train crop health classification model")
    parser.add_argument("--data_path", type=str, default="plant_disease_dataset",
                        help="Path to the dataset with Train and Validation folders")
    parser.add_argument("--model_save_path", type=str, default="models/crop_health_model",
                        help="Path where the trained model will be saved")
    parser.add_argument("--epochs", type=int, default=3,
                        help="Number of training epochs")
    parser.add_argument("--batch_size", type=int, default=8,
                        help="Batch size for training")
    
    args = parser.parse_args()
    
    train_model(args.data_path, args.model_save_path, args.epochs, args.batch_size)