<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{

    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
        ]);
    }

    public function rechercheAction(Request $request)
    {
        return $this->render('default/recherche.html.twig');
    }

    public function mentionsLegalesAction()
    {
        return $this->render("mentions/mentions_legales.html.twig");
    }

    public function conditionsGeneralesUtlisationAction()
    {
        return $this->render("mentions/cgu.html.twig");
    }

    public function dashboardAction()
    {
        return $this->render("admin/utilisateurs/dashboard.html.twig");
    }
}
