<?php
/**
 * Created by PhpStorm.
 * User: yann
 * Date: 17/05/17
 * Time: 16:12
 */

namespace NAO\UserBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class RegistrationType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('firstname')
            ->add('lastname')
        ;
    }

    public function getParent()
    {
        return 'FOS\UserBundle\Form\Type\RegistrationFormType';
    }

    public function getBlockPrefix()

    {
        return 'nao_user_registration';
    }

    public function getName()
    {
        return $this->getBlockPrefix();
    }




}