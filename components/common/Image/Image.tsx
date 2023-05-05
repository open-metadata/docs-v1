import React, { ReactNode, useState } from "react";
import classNames from "classnames";

import styles from "./Image.module.css";

interface ImageProps {
  caption?: string;
  pure?: string;
  src: string;
  alt?: string;
  clean?: boolean;
  height?: string;
  width?: string;
}

const Image = ({
  caption,
  pure,
  src,
  alt,
  clean,
  height,
  width,
}: ImageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  let block: ReactNode;
  let customCaption: ReactNode;
  let captionClass: string;

  if (caption) {
    captionClass = "has-caption";
    customCaption = <p className={styles.Caption}>{caption}</p>;
  }
  if (pure) {
    block = <img src={src} alt={alt} style={{ height, width }} />;
  } else if (isOpen) {
    block = (
      <section className={styles.Container}>
        <section className={styles.InnerContainer}>
          <img
            className={classNames(captionClass, styles.Image)}
            onClick={openModal}
            src={src}
            alt={alt}
            style={{ height, width }}
          />
          {customCaption}
        </section>
        <section className={styles.LightBox} onClick={closeModal}>
          <section className={styles.ImageContainer}>
            <img
              className={classNames(captionClass, styles.ModalImage)}
              src={src}
              alt={alt}
              style={{ height, width }}
              onClick={(e) => e.stopPropagation()}
            />
            {customCaption}
          </section>
        </section>
      </section>
    );
  } else if (clean) {
    block = (
      <section>
        <img
          className={captionClass}
          src={src}
          alt={alt}
          style={{ height, width }}
        />
        {customCaption}
      </section>
    );
  } else {
    block = (
      <section className={styles.Container}>
        <section className={styles.InnerContainer}>
          <img
            onClick={openModal}
            className={classNames(captionClass, styles.Image)}
            src={src}
            alt={alt}
            style={{ height, width }}
          />
          {customCaption}
        </section>
      </section>
    );
  }

  return block;
};

export default Image;
